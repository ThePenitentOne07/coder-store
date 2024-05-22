import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];

export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

function ProductFilter({ resetFilter }) {
  const [filterValues, setFilterValues] = useState({
    gender: [],
    category: "",
    priceRange: "",
  });

  const handleReset = () => {
    setFilterValues({
      gender: [],
      category: "",
      priceRange: "",
    });
    if (resetFilter) resetFilter(); // Call the resetFilter if provided
  };

  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Gender
        </Typography>
        <FMultiCheckbox
          name="gender"
          options={FILTER_GENDER_OPTIONS}
          value={filterValues.gender}
          onChange={(newGender) => setFilterValues((prev) => ({ ...prev, gender: newGender }))}
          sx={{ width: 1 }}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Category
        </Typography>
        <FRadioGroup
          name="category"
          options={FILTER_CATEGORY_OPTIONS}
          value={filterValues.category}
          onChange={(event) => setFilterValues((prev) => ({ ...prev, category: event.target.value }))}
          row={false}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
          getOptionLabel={(option) => FILTER_PRICE_OPTIONS.find((item) => item.value === option).label}
          value={filterValues.priceRange}
          onChange={(event) => setFilterValues((prev) => ({ ...prev, priceRange: event.target.value }))}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="button"
          color="inherit"
          variant="outlined"
          onClick={handleReset}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
