// src/Posts.js
import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { styled } from '@mui/system';
import WeatherCard from './WeatherCard';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 6px 12px ${theme.palette.primary.main}`,
  },
}));

const Posts = ({ searchTerm, userId }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the posts', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (userId === '' || post.userId === parseInt(userId))
      )
    );
  }, [searchTerm, userId, posts]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Posts</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <WeatherCard />
          </Grid>
          {filteredPosts.map(post => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <StyledCard>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.body}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Posts;
