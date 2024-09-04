import React, { useState } from "react";
import {
  Carousel,
  Typography,
  Button,
  Rate,
  Badge,
  Tag,
  Flex,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import { OPEN_ROUTES } from "../../../../utils/constants";
import {
  getRandomRansomValue,
  getUserId,
  openNotificationWithIcon,
} from "../../../../utils/helper";
import "./ProductCard.css";
import StoreIcon from "@mui/icons-material/Store";
import DescriptionIcon from "@mui/icons-material/Description";
import TextArea from "antd/es/input/TextArea";
import { addProductReview } from "../../../../apis/Vendor/ProductDetails";
import wallpaper_1 from "./../../../../assets/wallpaper_1.jpg";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const handleConnect = () => {
    navigate(OPEN_ROUTES.PRODUCT_DETAILS + props.data.company_data._id);
  };

  const [reviewModal, setReviewModal] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState("");

  let reviewsCount = 100;

  const random_val = getRandomRansomValue(3, 5);
  const handleAddReview = async () => {
    try {
      if (getUserId() != null) {
        let data = {
          id: props.data.product_id,
          rating: starRating,
          comments: comment,
          userIds: getUserId(),
        };
        const res = await addProductReview(data);
        if (res.success) {
          openNotificationWithIcon("success", "Thanks for the Feedback");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden flex flex-col mb-2">
      {props.data.Certificstes && props.data.Certificstes.map((item, index) => (
          (index < 1 ? <Badge.Ribbon key={index} text={item.fileName} style={{zIndex:'1'}} /> : '')
        ))}
      <Carousel autoplay className="rounded-lg overflow-hidden mb-2">
        {props.data.images ? (
          props.data.images.map((image, index) => {
            return (
              <div key={index} className="aspect-square bg-gray-200">
                <img
                  src={image == undefined ? wallpaper_1 : image}
                  alt={`Slide ${index}`}
                  className="object-cover w-full h-full"
                  style={{ cursor: "pointer" }}
                  onClick={handleConnect}
                />
              </div>
            );
          })
        ) : (
          <div className="aspect-square bg-gray-200">
            <img
              src={wallpaper_1}
              alt={`Slide ${1}`}
              className="object-cover w-full h-full"
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </Carousel>
      <div className="p-2 flex flex-col gap-2">
        {/* {props.data.Certificstes && props.data.Certificstes.map((item, index) => (
          (index < 1 ? <Badge.Ribbon key={index} text={item.fileName} /> : '')
        ))} */}
        <div>
          <div>
            <Flex gap={2} align="center">
              <StoreIcon />
              <Typography.Text className="font-semibold text-lg">
                {props.data.company_data.company_name}
              </Typography.Text>
            </Flex>
            <Flex gap={2} align="center">
              <DescriptionIcon />
              <Typography.Paragraph
                ellipsis
                className="text-gray-600 mb-0"
                style={{ marginBottom: "0px" }}
              >
                {props.data.company_data.description}
              </Typography.Paragraph>
            </Flex>
          </div>
          {/* <Typography.Title level={4}>{props.data.product_name}</Typography.Title> */}
          <div className="flex items-center gap-1">
            <span className="text-lg">{random_val}</span>
            <Rate defaultValue={random_val} allowHalf disabled />
          </div>
        </div>
        <div>
          {reviewsCount}+ Ratings |{" "}
          <a
            style={{ fontSize: "16px", fontWeight: "400" }}
            onClick={() => {
              setReviewModal(true);
            }}
          >
            Share your Review
          </a>
        </div>

        <Tag color="orange" className="flex items-center justify-center">
            Specialization: {props.data.company_data?.specialization}
        </Tag>
        <div className="flex flex-wrap gap-1">
          <Tag color="red" className="flex items-center justify-center">
            Experience: {props.data.company_data.experience + " years"}
          </Tag>
          <Tag color="red" className="flex items-center justify-center">
            Plant Area:{" "}
            {props.data.infrastructuredetails?.plant_area + " sq. ft."}
          </Tag>
        </div>
        <div className="flex flex-wrap">
          {Object.entries(props.data.machine_details).map((entry, index) => {
            let key = entry[0];
            let value = entry[1];
            return index < 3 ? (
              <Tag key={index} color="purple">
                {key}: {value}
              </Tag>
            ) : (
              ""
            );
          })}
        </div>
        <Button
          type="primary"
          className="mt-4"
          style={{
            fontSize: "18px",
            fontWeight: "500",
            height: "40px",
            background: "#FFD814",
            color: "black",
          }}
          onClick={handleConnect}
        >
          View Profile
        </Button>
      </div>

      {reviewModal && (
        <Modal
          title="Leave your Review"
          centered
          open={reviewModal}
          okText="Add Review"
          // footer={show ? null : ''}
          onOk={() => {
            handleAddReview();
            setReviewModal(false);
          }}
          onCancel={() => setReviewModal(false)}
          width={750}
        >
          <Flex vertical gap={20}>
            <Flex vertical>
              <Typography>Rate Your Experience</Typography>
              <Rate
                allowHalf
                value={starRating}
                onChange={(e) => {
                  setStarRating(e);
                }}
              />
            </Flex>
            <Flex vertical>
              <Typography>Add Feedback</Typography>
              <TextArea
                placeholder="Add Review"
                onChange={(event) => {
                  setComment(event.target.value);
                }}
                name="comment"
                id="comment"
                size="large"
                // variant="filled"
                allowClear
                value={comment}
              />
            </Flex>
          </Flex>
        </Modal>
      )}
    </div>
  );
};

export default ProductCard;
