import { Paper, Grid, TableContainer, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Product from './product';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { fetchAllItemcategory, fetchAllItemGroup, getAllItemSubCategoryByCategory } from 'store/thunk';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '80%',
    border: '1px solid #918989',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const LowStock = () => {
  const [product, setProduct] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [groupname, setGroupname] = useState(null);
  const [category, setcategory] = useState([]);
  const [categoryId, setcategoryId] = useState(null);
  const [categoryname, setcategoryname] = useState(null);
  const [subcategory, setsubcategory] = useState([]);
  const [subcategoryId, setsubcategoryId] = useState(null);
  const [subcategoryname, setsubcategoryname] = useState(null);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      const productResponse = await dispatch(fetchAllItemGroup());
      if (Array.isArray(productResponse)) {
        const options = productResponse.map((product) => ({
          value: product.id,
          label: product.name
        }));
        setProduct([...options]);
      }
    };
    const datacategory = async () => {
      const Response = await dispatch(fetchAllItemcategory(groupId));
      if (Array.isArray(Response)) {
        const options = Response.map((product) => ({
          value: product.id,
          label: product.name
        }));
        setcategory([...options]);
      }
    };
    datacategory();
    data();
  }, [dispatch, groupId]);

  useEffect(() => {
    const datasubcategory = async () => {
      if (categoryId) {
        const Response = await dispatch(getAllItemSubCategoryByCategory(categoryId));
        if (Array.isArray(Response)) {
          const options = Response.map((product) => ({
            value: product.id,
            label: product.name
          }));
          setsubcategory([...options]);
        }
      }
    };
    datasubcategory();
  }, [dispatch, categoryId]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setGroupId(selectedOption.value);
      setGroupname(selectedOption.label);
    }
  };

  const handleSelectcategoryChange = (selectedOption) => {
    if (selectedOption) {
      setcategoryId(selectedOption.value);
      setcategoryname(selectedOption.label);
    }
  };

  const handleSelectsubcategoryChange = (selectedOption) => {
    if (selectedOption) {
      setsubcategoryId(selectedOption.value);
      setsubcategoryname(selectedOption.label);
    }
  };

  return (
    <Paper style={{ width: 'auto', padding: '20px' }}>
      <TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" id="mycss">
              Product
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              styles={{ container: (provided) => ({ ...provided, width: '80%' }) }}
              options={product}
              onChange={handleSelectChange}
              value={groupId ? { value: groupId, label: groupname } : null}
              placeholder="Item Group"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              styles={{ container: (provided) => ({ ...provided, width: '80%' }) }}
              options={category}
              onChange={handleSelectcategoryChange}
              value={categoryId ? { value: categoryId, label: categoryname } : null}
              placeholder="Item Category"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              styles={{ container: (provided) => ({ ...provided, width: '80%' }) }}
              options={subcategory}
              onChange={handleSelectsubcategoryChange}
              value={subcategoryId ? { value: subcategoryId, label: subcategoryname } : null}
              placeholder="Item Sub Category"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={handleSearch} />
            </Search>
          </Grid>
          <Grid item xs={12}>
            <Product GroupId={groupId} CategoryId={categoryId} SubCategoryId={subcategoryId} Query={query} />
          </Grid>
        </Grid>
      </TableContainer>
    </Paper>
  );
};

export default LowStock;
