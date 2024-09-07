import { useEffect, useState } from "react";
import { Empty, Flex, Layout, Pagination, theme } from "antd";
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ProductCard from "./Component/ProductCard";
import "./Header.css";
import { LinearProgress } from "@material-ui/core";

const { Content } = Layout;

const CustomerContent = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    props.fetchDetails(pageIndex, pageSize);
    if (props.data) {
      setData(props.data);
    }
  }, []);

  useEffect(() => {
    props.fetchDetails(pageIndex, pageSize);
    if (props.data) {
      setData(props.data);
    }
  }, [pageIndex]);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  return (
    <Content
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        padding: "16px",
        // paddingTop:'10rem',
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // marginTop:'10rem'
      }}
    >
      {data && data.length != 0 && props.loading == false ? (
        <Flex
          gap={15}
          vertical
          // style={{marginTop:'50%'}}
          justify="center"
          align="center"
        >
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {data && data.length != 0 && props.loading == false
              ? data.map((card, index) => (
                  <ProductCard key={index} data={card} />
                ))
              : ""}
          </div>
          <Pagination
            defaultCurrent={1}
            responsive
            current={pageIndex}
            pageSize={pageSize}
            // total={props.totalCount}
            total={props.totalCount}
            onChange={(value) => setPageIndex(value)}
          />
        </Flex>
      ) : (
        <LinearProgress style={{ width: "30%" }} />
      )}
    </Content>
  );
};

export default CustomerContent;
