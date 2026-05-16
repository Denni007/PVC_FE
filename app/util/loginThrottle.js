/**
 * In-memory failed-login throttle keyed by mobile number.
 * After maxFailures attempts, further attempts are blocked for lockMs.
 * Resets on successful login. For multiple API instances, use Redis instead.
 *
 * Env (optional):
 *   LOGIN_THROTTLE_MAX_FAILURES — positive integer, default 5
 *   LOGIN_THROTTLE_LOCK_MS — lock duration in milliseconds, default 300000 (5 min), min 1000
 */

/** @type {Map<string, { failures: number; lockUntil: number }>} */
const store = new Map();

const DEFAULT_MAX_FAILURES = 5;
const DEFAULT_LOCK_MS = 5 * 60 * 1000;

function getThrottleConfig() {
  const rawMax = process.env.LOGIN_THROTTLE_MAX_FAILURES;
  const rawLockMs = process.env.LOGIN_THROTTLE_LOCK_MS;

  let maxFailures = parseInt(rawMax ?? "", 10);
  if (!Number.isFinite(maxFailures) || maxFailures < 1) {
    maxFailures = DEFAULT_MAX_FAILURES;
  }

  let lockMs = parseInt(rawLockMs ?? "", 10);
  if (!Number.isFinite(lockMs) || lockMs < 1000) {
    lockMs = DEFAULT_LOCK_MS;
  }

  return { maxFailures, lockMs };
}

function keyFor(mobileno) {
  return String(mobileno ?? "").trim();
}

function pruneIfUnlocked(entry, k) {
  if (!entry.lockUntil || entry.lockUntil > Date.now()) return entry;
  store.delete(k);
  return null;
}

/**
 * @returns {{ locked: boolean; retryAfterSeconds?: number }}
 */
function getLockStatus(mobileno) {
  const k = keyFor(mobileno);
  if (!k) return { locked: false };
  let entry = store.get(k);
  if (!entry) return { locked: false };
  entry = pruneIfUnlocked(entry, k);
  if (!entry) return { locked: false };
  if (entry.lockUntil > Date.now()) {
    return {
      locked: true,
      retryAfterSeconds: Math.ceil((entry.lockUntil - Date.now()) / 1000),
    };
  }
  return { locked: false };
}

/**
 * @returns {{ locked: boolean; retryAfterSeconds?: number }}
 */
function recordFailedAttempt(mobileno) {
  const { maxFailures, lockMs } = getThrottleConfig();
  const k = keyFor(mobileno);
  if (!k) return { locked: false };

  let entry = store.get(k);
  if (!entry) entry = { failures: 0, lockUntil: 0 };

  if (entry.lockUntil > Date.now()) {
    return {
      locked: true,
      retryAfterSeconds: Math.ceil((entry.lockUntil - Date.now()) / 1000),
    };
  }
  if (entry.lockUntil && Date.now() >= entry.lockUntil) {
    entry = { failures: 0, lockUntil: 0 };
  }

  entry.failures += 1;
  if (entry.failures >= maxFailures) {
    entry.lockUntil = Date.now() + lockMs;
    entry.failures = 0;
  }
  store.set(k, entry);

  if (entry.lockUntil > Date.now()) {
    return {
      locked: true,
      retryAfterSeconds: Math.ceil((entry.lockUntil - Date.now()) / 1000),
    };
  }
  return { locked: false };
}

function clearThrottle(mobileno) {
  const k = keyFor(mobileno);
  if (k) store.delete(k);
}

module.exports = {
  getLockStatus,
  recordFailedAttempt,
  clearThrottle,
  getThrottleConfig,
};
