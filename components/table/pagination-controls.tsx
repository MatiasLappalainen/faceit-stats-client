import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPage from "@mui/icons-material/FirstPage";
import { Box, IconButton } from "@mui/material";

interface PaginationActionsProps {
  hasMore: boolean;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const TablePaginationActions = ({
  hasMore,
  page,
  onPageChange,
}: PaginationActionsProps) => {
  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={!hasMore}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

export default TablePaginationActions;
