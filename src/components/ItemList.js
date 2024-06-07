import React, { useEffect, useState } from 'react';
import { TextField, Container, Grid, Card, CardContent, Typography, Box, Autocomplete, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s, background-color 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchBox = styled(Autocomplete)(({ theme }) => ({
  flex: 1,
  transition: 'flex-grow 0.3s ease-in-out',
  '&:focus-within': {
    flexGrow: 2,
  },
  '.MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    let result = items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (firstLetter) {
      result = result.filter(item => item.title[0].toLowerCase() === firstLetter.toLowerCase());
    }

    setFilteredItems(result);
  }, [search, firstLetter, items]);

  const handleSearchChange = (event, value) => {
    setSearch(value);
  };

  const handleFirstLetterChange = (event) => {
    setFirstLetter(event.target.value);
  };

  const uniqueFirstLetters = [...new Set(items.map(item => item.title[0].toUpperCase()))].sort();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Item List</Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <SearchBox
          freeSolo
          options={items.map(item => item.title)}
          onInputChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>First Letter</InputLabel>
          <Select
            value={firstLetter}
            onChange={handleFirstLetterChange}
            label="First Letter"
            size="small"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {uniqueFirstLetters.map(letter => (
              <MenuItem key={letter} value={letter}>
                {letter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {filteredItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <HoverCard>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.body}</Typography>
              </CardContent>
            </HoverCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemList;
