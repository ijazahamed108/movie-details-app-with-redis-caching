import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  Spinner
} from "reactstrap";

import axios from "axios";
import "../styles.css";

export default function App() {
  const [searchValue, setSearchValue] = useState("avatar");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    setLoading(true);
     await axios({
      url:"api/getMovies",
            params:{
              value:searchValue
            },
            method: "get",
            responseType: 'json',
            headers: {
              "Content-Type": "application/json"
          }     
      }).then((result) => {
        setError("");
        setMovies(result.data);
        setLoading(false);
      }).catch(error => setError(error));
  };

  const onChangeSearchValue = (event) => {
    const currentSearchValue = event.target.value;
    setSearchValue(currentSearchValue);
  };

  const onClickSearch = (event) => {
    getMovies();
  };

  const onClickCard = (movie) => {
    history.push(`/${movie.imdbID}`);
  };

  const renderCards = () => {
    return (
      <>
        {error ? (
          <Alert color="warning">{error}</Alert>
        ) : (
          movies.map((movie, idx) => (
            <Col md="4" key={idx}>
              <Card onClick={() => onClickCard(movie)}>
                <CardHeader>{movie.Title}</CardHeader>
                <CardBody>
                  <p>Released Year : {movie.Year}</p>
                  <p>IMDB ID : {movie.imdbID}</p>
                  <img src={movie.Poster} alt="Movie Poster" />
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </>
    );
  };

  return (
    <>
      <Container>
        <Form inline style={{ margin: "30px 0px", display: "flex" }}>
          <Input
            type="text"
            style={{ marginRight: "6px" }}
            onChange={onChangeSearchValue}
          />
          <Button color="primary" onClick={onClickSearch}>
            Search
          </Button>
        </Form>
        <Row>{loading ? <Spinner color="primary" /> : renderCards()}</Row>
      </Container>
    </>
  );
}
