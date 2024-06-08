import React, { useState, useEffect, useMemo } from 'react'
import { Upload, Carousel, Flex, Image, Button } from 'antd';
import { COMPANY_ID } from '../../utils/constants';
import { getPlantImages, uploadPlantImages } from '../../apis/Vendor/CompanyDetails';
import { convertBufferToBinary } from '../../utils/helper';
import { notification } from 'antd';

const Context = React.createContext({
    name: 'Default',
});

const ImageUpload = () => {

    const [fileList, setFileList] = useState([]);
    const [srcList, setSrcList] = useState([]);
    const [currentImage, setcurrentImage] = useState(null);
    const [api, contextHolder] = notification.useNotification();


    
    const openNotification = (placement) => {
        api.success({
            message: `Success`,
            description: <Context.Consumer>{({ name }) => `Machine Added Successfully`}</Context.Consumer>,
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
            description: <Context.Consumer>{({ name }) => `Unable to add Machine `}</Context.Consumer>,
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
            description: <Context.Consumer>{({ name }) => `Machine Details deleted Successfully`}</Context.Consumer>,
            placement,
        });
    };
    contextValue = useMemo(
        () => ({
            name: 'Make Mate',
        }),
        [],
    );

    const fetchImages = async () => {
        try {
            const res = await getPlantImages(COMPANY_ID)
            if (res.success) {
                if (res.count > 0) {

                    let newSrcList = [];
                    res.data.company_Images.map(async (item, i) => {
                        let data = {
                            name: item.name,
                            src: convertBufferToBinary(item.image),
                            type: 'image/png',
                            id: i + 1
                        }
                        newSrcList.push(data)
                    })
                    setSrcList(newSrcList);
                }
            }
        }
        catch (err) {
            return err
        }
    }


    useEffect(() => {
        fetchImages()

    }, [])


    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };


    const handleImageSrc = () => {
        try {
            const newSrcList = fileList.map((item) => ({
                name: item.name,
                src: URL.createObjectURL(item.originFileObj),
                type: item.type,
                id: item.uid,
            }));
            setSrcList(newSrcList);
            setcurrentImage(srcList[0])
        } catch (error) {
            console.error("Error reading file:", error);
        }
    };


    useEffect(() => {
        handleImageSrc();
    }, [fileList]);


    useEffect(() => {
        if (!currentImage) {
            setcurrentImage(srcList[0]);
        }
    }, [srcList]);


    const draggerProps = {
        name: "file",
        multiple: true,
        showUploadList: false,
        onChange: onChange,
        fileList: fileList,
        beforeUpload: false,
    };

    const uploadFiles = async () => {
        try {
            const res = await uploadPlantImages(COMPANY_ID, fileList)
            if(res.success){
                openNotification('topRight');
                fetchImages()
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    console.log(fileList)


    return (
        <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
             <Context.Provider value={contextValue}>
             {contextHolder}
            <Flex vertical gap={"large"}>
                
                <Carousel arrows dotPosition="left" infinite={false} style={{alignItems:'center'}}>
                    {srcList.map((item, i) => (
                        <div>
                            <Image src={item.src} style={{ height: "45vh", width: "32vw" }} />
                        </div>
                    ))}
                </Carousel>

                <Button onClick={uploadFiles}>Save</Button>

                <Upload.Dragger {...draggerProps}>
                    <div>
                        <p className="ant-upload-drag-icon">
                            {/* <UploadOutlined /> */}
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <Button
                            className="button-submit avatar-button-style"
                            style={{
                                color: "white",
                                backgroundColor: "rgb(29, 155, 240)",
                            }}
                        >
                            <span style={{ color: "white", fontWeight: "bolder" }}>
                                Select from Computer
                            </span>
                        </Button>
                    </div>
                </Upload.Dragger>
            </Flex>
            </Context.Provider>
        </div>
    )
}

export default ImageUpload
