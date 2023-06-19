import { memo, useEffect } from "react";
import { Pagination } from "@mantine/core";
import { useParams, useNavigate } from "react-router";

function BasicPagination({ activePage, setPage, movieData }) {
  const params = useParams();
  const navigate = useNavigate();

  function handlePage(e) {
    setPage(e);
    navigate(`/${params.Movies}/${params.MovieType}/${e}`);
    console.log(e);
  }

  console.log();

  return (
    <>
      {movieData?.data ? (
        <Pagination
          value={activePage}
          onChange={(e) => handlePage(e)}
          total={
            movieData.data.total_pages > 500 ? 500 : movieData.data.total_pages
          }
          color="red"
          radius="xl"
          sx={(theme) => ({
            fontSize: theme.fontSizes.lg,
            "@media (max-width: 40em)": {
              fontSize: theme.fontSizes.sm,
            },
          })}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default memo(BasicPagination);
