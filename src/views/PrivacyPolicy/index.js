import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

// ==============================|| PRIVACY POLICY ||============================== //

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#0a3d62', borderBottom: '2px solid #0a3d62', pb: 2 }}>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>Effective Date:</strong> [Insert Date]
        </Typography>

        <Typography variant="body1" paragraph>
          This Privacy Policy describes how Peregrine Pipes ("Company", "we", "our", or "us") collects,
          uses, stores, and protects personal data when you use the Peregrine Loyalty Program Mobile Application ("App").
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          The App is designed for dealers, distributors, plumbers, contractors, and authorized channel partners of Peregrine Pipes.
          By using this App, you consent to the practices described below.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            1. Information We Collect
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Personal Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Full Name" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Mobile Number" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email Address" />
            </ListItem>
            <ListItem>
              <ListItemText primary="City, State, PIN Code" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Business / Shop Name" />
            </ListItem>
            <ListItem>
              <ListItemText primary="GST Number (if applicable)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="PAN Number (if required for tax compliance)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Bank details (for reward redemption)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Profile photo (optional)" />
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Loyalty & Transaction Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Invoice uploads" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Product purchase details" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Reward points earned and redeemed" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Redemption history" />
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Device & Technical Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Device model and OS version" />
            </ListItem>
            <ListItem>
              <ListItemText primary="IP address" />
            </ListItem>
            <ListItem>
              <ListItemText primary="App usage logs" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Crash reports" />
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Permissions Used
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Camera – for invoice uploads" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Storage – for uploading documents" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Location – for regional validation (only with consent)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Notifications – to send program updates and offers" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            2. How We Use Your Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Account registration and management" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Reward point calculation and redemption" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Fraud prevention and validation" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Sending SMS, email, and push notifications" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Improving user experience" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Legal and tax compliance" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            3. Legal Basis for Processing (DPDP Act 2023 Compliance)
          </Typography>
          <Typography variant="body1" paragraph>
            We process personal data based on your consent and for legitimate business purposes,
            in accordance with the Digital Personal Data Protection Act, 2023 (India).
          </Typography>
          <Typography variant="body1" paragraph>
            You may withdraw consent at any time by contacting us.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            4. Data Sharing
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>We do not sell personal data.</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Cloud hosting and IT service providers" />
            </ListItem>
            <ListItem>
              <ListItemText primary="SMS/email gateway providers" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Payment processing partners" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Legal or government authorities when required" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            5. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We retain personal information for as long as required to maintain your loyalty account
            or as required under applicable tax and regulatory laws.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            6. Taxation & Compliance
          </Typography>
          <Typography variant="body1" paragraph>
            Rewards redeemed under the loyalty program may be subject to applicable tax laws,
            including TDS (Tax Deducted at Source) where required under Indian Income Tax regulations.
            Users may be required to provide PAN details for compliance purposes.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            7. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement reasonable technical and organizational security measures
            to safeguard personal data against unauthorized access, misuse, or disclosure.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            8. User Rights
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Access your personal data" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Correct inaccurate information" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Request deletion (subject to legal obligations)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Withdraw marketing consent" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            9. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            This App is intended for business professionals and is not for individuals under 18 years of age.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            10. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy periodically.
            Updates will be posted in the App with a revised effective date.
          </Typography>
        </Box>

        <Box sx={{ mb: 4, backgroundColor: '#f4f6f7', p: 3, borderRadius: 1 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#0a3d62', mt: 3 }}>
            11. Grievance Officer
          </Typography>
          <Typography variant="body1" paragraph>
            As required under Indian law, you may contact our Grievance Officer for any privacy-related concerns:
          </Typography>
          <Typography variant="body1" component="div" sx={{ mt: 2 }}>
            <strong>Peregrine Pipes</strong>
            <br />
            [Registered Office Address]
            <br />
            Surat, Gujarat, India
            <br />
            Email: support@peregrinepipe.com
            <br />
            Phone: [Insert Contact Number]
            <br />
            Response Time: Within 15 working days
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
