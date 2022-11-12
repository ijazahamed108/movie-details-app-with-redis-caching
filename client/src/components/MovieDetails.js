import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Button, Container, Spinner } from "reactstrap";

const MovieDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getMovieDetails();
  }, []);

  const goBack = () => {
    history.push("/");
  };

  const getMovieDetails = async () => {
    setLoading(true);
  
    await axios({
      url:"api/getMovieDetails",
            params:{
              movieId:params.movieId
            },
            method: "get",
            responseType: 'json',
            headers: {
              "Content-Type": "application/json"
          }     
      }).then((result) => {
        console.log(result)
        setError("");
        setDetails(result.data);
        setLoading(false);
      }).catch(error => setError(error));

  };

  const renderDetails = () => {
    return (
      <>
        {error ? (
          <Alert color="warning">{error}</Alert>
        ) : (
          <>
            <Button color="danger" onClick={goBack}>
              Go Back
            </Button>
            <p>Title : {details.Title}</p>
            <p>Year : {details.Year}</p>
            <p>Rated : {details.Rated}</p>
            <p>Released : {details.Released}</p>
            <p>Runtime : {details.Runtime}</p>
            <p>Genre : {details.Genre}</p>
            <p>Director : {details.Director}</p>
            <p>Plot : {details.Plot}</p>

            {details.Ratings &&
              details.Ratings.map((rating) => (
                <p>
                  {rating.Source} = {rating.Value}
                </p>
              ))}
            <img src={details.Poster} alt="Movie Poster" />
          </>
        )}
      </>
    );
  };

  return (
    <Container>
      <h1>
        Movie Details {params.movieId} {details.imdbID}
      </h1>
      {loading ? <Spinner color="primary" /> : renderDetails()}
    </Container>
  );
};

export default MovieDetails;
