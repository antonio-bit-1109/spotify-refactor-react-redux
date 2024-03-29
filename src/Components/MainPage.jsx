import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MusicPlayer from "./MusicPlayer";
import { fetchData } from "../redux/functions/fetchFile";
import {
    setDataFetchUno,
    setDataFetchDue,
    setDataFetchTre,
    setStringsToShowOnPlayer,
    setAddSongPreferite,
    setRemoveSongPreferite,
    setAllSongPreferiteObj,
    setRemoveSongPreferiteObject,
} from "../redux/reducers/stateSliceReducer";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { Heart, HeartFill } from "react-bootstrap-icons";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
    },
};

const MainPage = () => {
    const dispatch = useDispatch();
    const datiPrimaFetch = useSelector((state) => state.FetchAlMount.dataFetchUno);
    const datiSecondaFetch = useSelector((state) => state.FetchAlMount.dataFetchDue);
    const datiterzaFetch = useSelector((state) => state.FetchAlMount.dataFetchTre);
    const datiFetchInput = useSelector((state) => state.FetchAlMount.dataFetchInput);
    const IDsongPreferite = useSelector((state) => state.FetchAlMount.songPreferite);
    const [alertIsShowing, setAlertIsShowing] = useState(false);

    console.log("DATIFETCH", datiPrimaFetch, datiSecondaFetch, datiterzaFetch, datiFetchInput);
    console.log("IDsongPreferite", IDsongPreferite);

    useEffect(() => {
        dispatch(fetchData(url, "eminem", options, setDataFetchUno));
        dispatch(fetchData(url, "caparezza", options, setDataFetchDue));
        dispatch(fetchData(url, "hailtotheThief", options, setDataFetchTre));
    }, []);

    useEffect(() => {
        if (alertIsShowing) {
            setTimeout(() => {
                setAlertIsShowing(false);
            }, 1000);
        }
    }, [alertIsShowing]);

    return (
        <>
            {" "}
            {datiPrimaFetch && datiSecondaFetch && datiterzaFetch && (
                <>
                    {" "}
                    <Col xs={12} md={9} className=" offset-md-3 mainPage">
                        <div>
                            <Row>
                                <Col xs={9} lg={11} className=" mainLinks d-none d-md-flex">
                                    <Link href="#">TRENDING</Link>
                                    <Link href="#">PODCAST</Link>
                                    <Link href="#">MOODS AND GENRES</Link>
                                    <Link href="#">NEW RELEASES</Link>
                                    <Link href="#">DISCOVER</Link>
                                </Col>
                            </Row>
                            {alertIsShowing && (
                                <Row className="sticky-top">
                                    <Col xs={10}>
                                        <div className="mt-5 d-flex justify-content-center">
                                            <Alert variant="success fs-5">
                                                Hai Aggiunto una canzone alla Playlist!
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>
                            )}

                            <Row>
                                <Col xs={10}>
                                    <div id="searchResults">
                                        {datiFetchInput && (
                                            <>
                                                <h2>Search Results</h2>
                                                <Row
                                                    xs={1}
                                                    sm={2}
                                                    lg={3}
                                                    xl={4}
                                                    className="imgLinks py-3"
                                                    id="rockSection"
                                                >
                                                    {datiFetchInput.data.slice(0, 20).map((singleAlbum) => (
                                                        <Col key={singleAlbum.id}>
                                                            <Card
                                                                onClick={() => {
                                                                    dispatch(setStringsToShowOnPlayer(singleAlbum));
                                                                }}
                                                                className="m-2 h-100 bg-transparent border-0 position-relative"
                                                            >
                                                                <Card.Img variant="top" src={singleAlbum.album.cover} />
                                                                <Card.Body className=" d-flex flex-column justify-content-start">
                                                                    <Card.Text className=" m-0">
                                                                        {singleAlbum.album.title}
                                                                    </Card.Text>
                                                                    <Card.Text className=" m-0">
                                                                        Canzone: {singleAlbum.title_short}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                                {IDsongPreferite.includes(singleAlbum.id) ? (
                                                                    <HeartFill
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                setRemoveSongPreferite(singleAlbum.id)
                                                                            );
                                                                            dispatch(
                                                                                setRemoveSongPreferiteObject(
                                                                                    singleAlbum.id
                                                                                )
                                                                            );
                                                                        }}
                                                                        className="position-absolute top-0 end-0 text-danger m-3 fs-3"
                                                                    />
                                                                ) : (
                                                                    <Heart
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                setAddSongPreferite(singleAlbum.id)
                                                                            );
                                                                            dispatch(
                                                                                setAllSongPreferiteObj(singleAlbum)
                                                                            );
                                                                            setAlertIsShowing(true);
                                                                        }}
                                                                        className="position-absolute top-0 end-0 text-danger m-3 fs-3"
                                                                    />
                                                                )}
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} id="rock">
                                    <h2 className="text-light">Rock music</h2>
                                    <Row xs={1} sm={2} lg={3} xl={4} className="imgLinks py-3" id="rockSection">
                                        {datiPrimaFetch.data.slice(0, 4).map((singleAlbum) => (
                                            <Col key={singleAlbum.id}>
                                                <Card
                                                    onClick={() => {
                                                        dispatch(setStringsToShowOnPlayer(singleAlbum));
                                                    }}
                                                    className="m-2 h-100 bg-transparent border-0 position-relative"
                                                >
                                                    <Card.Img variant="top" src={singleAlbum.album.cover} />
                                                    <Card.Body className=" d-flex flex-column justify-content-start">
                                                        <Card.Text className=" m-0">
                                                            Album: {singleAlbum.album.title}
                                                        </Card.Text>
                                                        <Card.Text className=" m-0">
                                                            Canzone: {singleAlbum.title_short}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    {IDsongPreferite.includes(singleAlbum.id) ? (
                                                        <HeartFill
                                                            onClick={() => {
                                                                dispatch(setRemoveSongPreferite(singleAlbum.id));
                                                                dispatch(setRemoveSongPreferiteObject(singleAlbum.id));
                                                            }}
                                                            className="position-absolute top-0 end-0 text-danger m-3 fs-3"
                                                        />
                                                    ) : (
                                                        <Heart
                                                            onClick={() => {
                                                                dispatch(setAddSongPreferite(singleAlbum.id));
                                                                dispatch(setAllSongPreferiteObj(singleAlbum));
                                                                setAlertIsShowing(true);
                                                            }}
                                                            className="position-absolute top-0 end-0 text-danger m-3 fs-3"
                                                        />
                                                    )}
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} id="pop">
                                    <h2>Pop Culture</h2>
                                    <Row xs={1} sm={2} lg={3} xl={4} className="imgLinks py-3" id="rockSection">
                                        {datiSecondaFetch.data.slice(0, 4).map((singleAlbum) => (
                                            <Col key={singleAlbum.id}>
                                                <Card
                                                    onClick={() => {
                                                        dispatch(setStringsToShowOnPlayer(singleAlbum));
                                                    }}
                                                    className="m-2 h-100 bg-transparent border-0 position-relative"
                                                >
                                                    <Card.Img variant="top" src={singleAlbum.album.cover} />
                                                    <Card.Body className="bg-transparent">
                                                        <Card.Text className=" m-0">
                                                            Album: {singleAlbum.album.title}
                                                        </Card.Text>
                                                        <Card.Text className=" m-0">
                                                            Canzone: {singleAlbum.title_short}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    {IDsongPreferite.includes(singleAlbum.id) ? (
                                                        <HeartFill
                                                            onClick={() => {
                                                                dispatch(setRemoveSongPreferite(singleAlbum.id));
                                                                dispatch(setRemoveSongPreferiteObject(singleAlbum.id));
                                                            }}
                                                            className="position-absolute top-0 end-0 text-danger m-3 fs-3"
                                                        />
                                                    ) : (
                                                        <Heart
                                                            onClick={() => {
                                                                dispatch(setAddSongPreferite(singleAlbum.id));
                                                                dispatch(setAllSongPreferiteObj(singleAlbum));
                                                                setAlertIsShowing(true);
                                                            }}
                                                            className="position-absolute top-0 end-0 text-danger m-3 fs-3"
                                                        />
                                                    )}
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={10} id="hiphop">
                                    <h2>#HipHop</h2>
                                    <Row xs={1} sm={2} lg={3} xl={4} className="imgLinks py-3" id="rockSection">
                                        {datiterzaFetch.data.slice(0, 4).map((singleAlbum) => (
                                            <Col key={singleAlbum.id} className="mb-7">
                                                <Card
                                                    onClick={() => {
                                                        dispatch(setStringsToShowOnPlayer(singleAlbum));
                                                    }}
                                                    className="m-2 h-100 bg-transparent border-0 position-relative"
                                                >
                                                    <Card.Img variant="top" src={singleAlbum.album.cover} />
                                                    <Card.Body className="bg-transparent">
                                                        <Card.Text className=" m-0">
                                                            Album: {singleAlbum.album.title}
                                                        </Card.Text>
                                                        <Card.Text className=" m-0">
                                                            Canzone: {singleAlbum.title_short}
                                                        </Card.Text>
                                                    </Card.Body>{" "}
                                                    {IDsongPreferite.includes(singleAlbum.id) ? (
                                                        <HeartFill
                                                            onClick={() => {
                                                                dispatch(setRemoveSongPreferite(singleAlbum.id));
                                                                dispatch(setRemoveSongPreferiteObject(singleAlbum.id));
                                                            }}
                                                            className="position-absolute top-0 end-0 text-danger m-3 fs-3"
                                                        />
                                                    ) : (
                                                        <Heart
                                                            onClick={() => {
                                                                dispatch(setAddSongPreferite(singleAlbum.id));
                                                                dispatch(setAllSongPreferiteObj(singleAlbum));
                                                                setAlertIsShowing(true);
                                                            }}
                                                            className="position-absolute top-0 end-0 text-danger m-3 fs-3"
                                                        />
                                                    )}
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Row>
                        <MusicPlayer />
                    </Row>
                </>
            )}
        </>
    );
};

export default MainPage;
