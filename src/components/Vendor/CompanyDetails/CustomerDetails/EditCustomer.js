import { useState, useEffect } from "react";
import { Input, Modal, Form, Row, Col, InputNumber, DatePicker } from "antd";
import { openNotificationWithIcon } from "../../../../utils/helper";
import { updateProductDetails } from "../../../../apis/Vendor/ProductDetails";

const EditCustomer = (props) => {
  console.log(props);

  const [form] = Form.useForm();
  const [Customer, setCustomer] = useState({
    product_name: props.editItem.product_name,
    part_material: props.editItem.part_material,
    tool_material: props.editItem.tool_material,
    no_of_cavity: props.editItem.no_of_cavity,
    runner: props.editItem.runner,
    tool_tonnage: props.editItem.tool_tonnage,
    part_name: props.editItem.part_name,
  });

  const initialValues = {
    product_name: props.editItem.product_name,
    part_material: props.editItem.part_material,
    tool_material: props.editItem.tool_material,
    no_of_cavity: props.editItem.no_of_cavity,
    runner: props.editItem.runner,
    tool_tonnage: props.editItem.tool_tonnage,
    part_name: props.editItem.part_name,
  };

  const handleFormSubmit = async () => {
    try {
      let params = {
        id: props.editItem.id,
      };
      const res = await updateProductDetails(params, Customer);
      if (res.success) {
        props.fetchCustomerDetails();
        openNotificationWithIcon(
          "success",
          "Product Details Updated Syccessfully"
        );
      } else {
        openNotificationWithIcon("error", "Something went wrong");
      }
      props.setEditModal(false);
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Something went wrong");
    }
  };

  const handleInputNumber = (id, value) => {
    setCustomer({ ...Customer, [id]: value });
  };

  const handleChange = (e) => {
    setCustomer({ ...Customer, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <Modal
        title="Edit Machine"
        centered
        open={props.editModal}
        okText="Save"
        // footer={show ? null : ''}
        onOk={form.submit}
        onCancel={() => {
          props.setEditModal(false);
        }}
        width={750}
      >
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          form={form}
          initialValues={initialValues}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Product Name"
                name="product_name"
                rules={[
                  { required: true, message: "Product Name is required" },
                ]}
              >
                <Input
                  className="custom-input"
                  variant="filled"
                  id="product_name"
                  placeholder="Enter Product Name"
                  value={Customer["product_name"]}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Part Name"
                name="part_name"
                rules={[{ required: true, message: "Part Name is required" }]}
              >
                <Input
                  className="custom-input"
                  variant="filled"
                  id="part_name"
                  placeholder="Enter Part Name"
                  value={Customer["part_name"]}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="No of Cavity"
                name="no_of_cavity"
                rules={[
                  { required: true, message: "No. of Cavity is required" },
                ]}
              >
                <InputNumber
                  min={1}
                  size="large"
                  variant="filled"
                  style={{ width: "93%" }}
                  placeholder="Enter No of Cavity"
                  value={Customer["no_of_cavity"]}
                  onChange={(e) => {
                    handleInputNumber("no_of_cavity", e);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Part Material"
                name="part_material"
                rules={[{ required: true, message: "Material is required" }]}
              >
                <Input
                  className="custom-input"
                  variant="filled"
                  id="part_material"
                  placeholder="Enter Part Material"
                  value={Customer["part_material"]}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tool Material"
                name="tool_material"
                rules={[
                  { required: true, message: "Tool Material is required" },
                ]}
              >
                <Input
                  className="custom-input"
                  variant="filled"
                  id="tool_material"
                  placeholder="Enter Tool Material"
                  value={Customer["tool_material"]}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Feed System"
                name="runner"
                rules={[{ required: true, message: "Runner is required" }]}
              >
                <Input
                  className="custom-input"
                  variant="filled"
                  id="runner"
                  placeholder="Feed System"
                  value={Customer["runner"]}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tool Tonnage"
                name="tool_tonnage"
                rules={[
                  { required: true, message: "Tool tonnage is required" },
                ]}
              >
                <InputNumber
                  min={1}
                  size="large"
                  variant="filled"
                  style={{ width: "93%" }}
                  placeholder="Enter Tool Tonnage"
                  value={Customer["tool_tonnage"]}
                  onChange={(e) => {
                    handleInputNumber("tool_tonnage", e);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCustomer;
