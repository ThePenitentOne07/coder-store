import React, { useEffect } from 'react'
import apiService from '../app/apiService';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { Alert, Card, Divider, Grid, Stack, Rating } from '@mui/material';
import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { fCurrency } from '../utils';

function DetailPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const getProduct = async () => {
                setLoading(true);
                try {
                    const res = await apiService.get(`/products/${params.id}`);
                    setProduct(res.data);
                    setError("");
                } catch (error) {
                    console.log(error);
                    setError(error.message);
                }
                setLoading(false);
            };
            getProduct();
        }
    }, [params]);

    return (
        <Container sx={{ my: 3 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
                <Link underline="hover" color="inherit" component={RouterLink} to="/">
                    CoderStore
                </Link>
                <Typography color="text.primary">{product?.name}</Typography>
            </Breadcrumbs>
            <Box sx={{ position: "relative", height: 1 }}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {error ? (
                            <Alert severity="error">{error}</Alert>
                        ) : (
                            <>
                                {product && (
                                    <Card>
                                        <Grid container>
                                            <Grid item xs={12} md={6}>
                                                <Box p={2}>
                                                    <Box
                                                        sx={{
                                                            borderRadius: 2,
                                                            overflow: "hidden",
                                                            display: "flex",
                                                        }}
                                                    >
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                width: 1,
                                                                height: 1,
                                                            }}
                                                            src={product.cover}
                                                            alt="product"
                                                        />
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        mt: 2,
                                                        mb: 1,
                                                        display: "block",
                                                        textTransform: "uppercase",
                                                        color:
                                                            product.status === "sale"
                                                                ? "error.main"
                                                                : "info.main",
                                                    }}
                                                >
                                                    {product.status}
                                                </Typography>
                                                <Typography variant="h5" paragraph>
                                                    {product.name}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={1}
                                                    sx={{ mb: 2 }}
                                                >
                                                    <Rating
                                                        value={product.totalRating}
                                                        precision={0.1}
                                                        readOnly
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ color: "text.secondary" }}
                                                    >
                                                        ({product.totalReview} reviews)
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="h4" sx={{ mb: 3 }}>
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            color: "text.disabled",
                                                            textDecoration: "line-through",
                                                        }}
                                                    >
                                                        {product.priceSale && fCurrency(product.priceSale)}
                                                    </Box>
                                                    &nbsp;{fCurrency(product.price)}
                                                </Typography>

                                                <Divider sx={{ borderStyle: "dashed" }} />
                                                <Box>
                                                    {/* <ReactMarkdown
                                                        rehypePlugins={[rehypeRaw]}
                                                        remarkPlugins={[remarkGfm]}
                                                        children={product.description}
                                                    /> */}
                                                    <ReactMarkdown
                                                        children={product.description}
                                                        remarkPlugins={[remarkGfm]} // Add any remark plugins if needed
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                )}
                                {!product && (
                                    <Typography variant="h6">404 Product not found</Typography>
                                )}
                            </>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
}


export default DetailPage
