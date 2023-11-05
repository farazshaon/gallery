import React, { useRef, useState } from "react";
import image1 from "../assets/images/image-1.webp";
import { Container, Card, Row, Col } from "react-bootstrap";
import AddImages from "./AddImages";

const Gallery = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [checkedImg, setCheckedImg] = useState([]);
  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);

  function handleSort() {
    const images = [...selectedImages];
    const temp = images[dragPerson.current];
    images[dragPerson.current] = images[draggedOverPerson.current];
    images[draggedOverPerson.current] = temp;
    setSelectedImages(images);
  }

  const onSelectFile = (e) => {
    const selectdFile = e.target.files;
    const selectedArray = Array.from(selectdFile);

    const imagesArray = selectedArray.map((file, index) => {
      return {
        url: URL.createObjectURL(file),
        id: index,
      };
    });

    setSelectedImages(imagesArray);
  };

  const toggleCheck = (index) => {
    const isChecked = checkedImg.includes(index);
    if (isChecked) {
      setCheckedImg(checkedImg.filter((item) => item !== index));
    } else {
      setCheckedImg([...checkedImg, index]);
    }
  };

  const removeSelectedItems = () => {
    const newSelectedImages = selectedImages.filter(
      (_, index) => !checkedImg[index]
    );

    setSelectedImages(newSelectedImages);
    setCheckedImg([]);
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between">
              <div className="form-check">
                <input
                  className="form-check-input"
                  checked={checkedImg.length !== 0}
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="flexCheckDefault"
                >
                  {checkedImg.length} {checkedImg.length > 1 ? "Files" : "File"}{" "}
                  Selected
                </label>
              </div>

              <a
                href="#"
                className="text-danger text-decoration-none"
                onClick={removeSelectedItems}
              >
                Delete File
              </a>
            </div>
          </Card.Header>

          <Card.Body>
            <Row>
              <Col md={5}>
                <Card className=" d-flex justify-content-center h-4 box">
                  <img src={selectedImages[0]?.url ?? image1} className="img" />
                  <div className="form-check select-input">
                    <input
                      className="form-check-input"
                      checked={checkedImg.includes(selectedImages[0]?.id)}
                      type="checkbox"
                      value={selectedImages[0]?.id}
                      onChange={() => toggleCheck(selectedImages[0]?.id)}
                      id="flexCheckDefault"
                    />
                  </div>
                  <div className="overlay"></div>
                </Card>

         
              </Col>
              <Col md={7}>
                <Row className="g-4 ">
                  {selectedImages.length > 0 &&
                    selectedImages.map((item, index) => (
                      <Col
                        md={4}
                        key={index}
                        draggable
                        onDragStart={() => (dragPerson.current = index)}
                        onDragEnter={() => (draggedOverPerson.current = index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <Card className="box">
                          <img
                            src={item.url ?? image1}
                            className="img-fluid"
                            alt=""
                          />
                          <div className="overlay">
                            <div className="form-check select-input">
                              <input
                                className="form-check-input"
                                checked={checkedImg.includes(item?.id)}
                                type="checkbox"
                                value={item?.id}
                                onChange={() => toggleCheck(item?.id)}
                                id="flexCheckDefault"
                              />
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}

                  <Col md={4}>
                    <AddImages onSelectFile={onSelectFile} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Gallery;
