import React, { useState, useEffect, useMemo} from 'react';
import { Col, Row, Form, Input, Button, Image, Upload } from 'antd';
import './../../Dashboard/Dashboard.css'
import { getCompanyDetails, updateCompanyDetails, uploadAvatar } from '../../../../apis/Vendor/CompanyDetails';
import { USER_ID } from '../../../../utils/constants';
import { convertBufferToBinary, deepEqual, getBase64, uploadButton } from '../../../../utils/helper';
import { notification} from 'antd';
const Context = React.createContext({
  name: 'Default',
});


const BasicDetails = (props) => {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState();
  const [allvalues,setallValues] = useState(undefined)
  const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.success({
        message: `Success`,
        description: <Context.Consumer>{({ name }) => `Detail Added Successfully`}</Context.Consumer>,
        placement,
        });
    };
    let contextValue = useMemo(
        () => ({
        name: 'Make Mate',
        }),
        [],
    );

    const openFailedNotification = (placement) => {
        api.error({
        message: `Something went wrong`,
        description: <Context.Consumer>{({ name }) => `Unable to add detail `}</Context.Consumer>,
        placement,
        });
    };
        contextValue = useMemo(
        () => ({
        name: 'Make Mate',
        }),
        [],
    );

    const deleteNotification = (placement) => {
        api.success({
        message: `Success`,
        description: <Context.Consumer>{({ name }) => `Detail deleted Successfully`}</Context.Consumer>,
        placement,
        });
    };
    contextValue = useMemo(
        () => ({
        name: 'Make Mate',
        }),
        [],
    );


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChangeLogo = ({ fileList: newFileList }) => setFileList(newFileList);

  useEffect(() => {
    let file = convertBufferToBinary(props.CompanyDetails.company_logo)
    if(file!=""){
    setFileList([{
      uid: '-1',
      name: 'pen.png',
      status: 'done',
      url: file,
  }])
}
  },[props.CompanyDetails.company_logo])


  const [basicDetails, setBasicDetails] = useState({
    "description": props.CompanyDetails.description,
    "company_name": props.CompanyDetails.company_name,
    "GST_no": props.CompanyDetails.GST_no,
    "experience": props.CompanyDetails.experience,
    "current_projects_no": props.CompanyDetails.current_projects_no
  });

  const initialValues = {
    "description": props.CompanyDetails.description,
    "company_name": props.CompanyDetails.company_name,
    "GST_no": props.CompanyDetails.GST_no,
    "experience": props.CompanyDetails.experience,
    "current_projects_no": props.CompanyDetails.current_projects_no
     }
  
  const handleChange = (event) => {
    setBasicDetails({ ...basicDetails, [event.target.id]: event.target.value })
  }

  const handleFormSubmit = async() => {

    try{
    let params = {
      // user: localStorage.get(USER_ID)
      user: USER_ID
    }
    let equal = deepEqual(allvalues,initialValues) || allvalues==undefined

    let res;
    if(!equal){
    res = await updateCompanyDetails(params,basicDetails)
    }
    if((res && res.success) || equal){
      let updatedData;
      openNotification('topRight');
      if(!equal){
       updatedData = await getCompanyDetails(params)
      }
      if((updatedData && updatedData.success) || equal){
      props.onSaveAndSubmit();
      }
      else{
        //Toast
      }
    }
    else{
      openFailedNotification('topRight');
    }
 
    }
    catch(err){
      console.log(err)
    }
  }


  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      const res = await uploadAvatar(file,USER_ID) 
      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
    }
  };


  const draggerProps = {
    name: "file",
    onChange: handleChangeLogo,
    fileList: fileList,
    onPreview: handlePreview,
    listType:"picture-circle",
    customRequest: uploadImage,
    onRemove: uploadImage
  };


  const handleValuechange = (changedValues, allValues) => {
    setallValues(allValues)
  }

  return (
    <div>
      <Context.Provider value={contextValue}>
                {contextHolder}
 { props && Object.keys(props.CompanyDetails).length>0 ? 
    <Form
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={handleValuechange}
      onFinish={handleFormSubmit}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Row gutter={16} align="middle">
            <Col span={8}>
              <Form.Item label="Company Logo">
                <div className="company-logo">

                <Upload {...draggerProps}>
                    {fileList && fileList.length>0? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: 'none',
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="About Us" name="description">
                <Input.TextArea
                  rows={4}
                  placeholder='Provide your company description and an overview of your company'
                  id={"description"}
                  onChange={handleChange}
                  autoComplete='off'
                  value={basicDetails["description"]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Company Name"
            name="company_name"
            rules={[{ required: true, message: 'Company Name is required' }]}
          >
            <Input
              className="custom-input"
              variant="filled"
              placeholder="Enter your Company Name"
              id={"company_name"}
              onChange={handleChange}
              autoComplete='off'
              value={basicDetails["company_name"]}
            />
          </Form.Item>
          <Form.Item
            label="Total Experience (in Years)"
            name="experience"
            rules={[{ required: true, message: 'Total Experience is required' }]}
          >
            <Input
              className="custom-input"
              variant="filled"
              placeholder="Enter your Total Experience"
              id={"experience"}
              autoComplete='off'
              onChange={handleChange}
              value={basicDetails["experience"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="GST"
            name="GST_no"
            rules={[{ required: true, message: 'GST is required' }]}
          >
            <Input
              className="custom-input"
              variant="filled"
              placeholder="Enter your GST No."
              id={"GST_no"}
              autoComplete='off'
              onChange={handleChange}
              value={basicDetails["GST_no"]}
            />
          </Form.Item>
          <Form.Item
            label="Current Running Project"
            name="current_projects_no"
            rules={[{ required: true, message: 'Current Running Project is required' }]}
          >
            <Input
              className="custom-input"
              variant="filled"
              placeholder="Enter your Current Running Project"
              id={"current_projects_no"}
              autoComplete='off'
              onChange={handleChange}
              value={basicDetails["current_projects_no"]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ bottom: '-37%', position: 'absolute', right: '-1%' }}>
        <Button type="primary" htmlType="submit" style={{ fontSize: '18px', fontWeight: '600', height: '40px'}}>
          Save & Continue
        </Button>
      </Form.Item>
    </Form>:''
}
</Context.Provider>
</div>
  )
}

export default BasicDetails