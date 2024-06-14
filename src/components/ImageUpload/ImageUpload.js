import React, { useState, useEffect, useMemo } from 'react'
import { Upload, Carousel, Flex, Image, Button, Card } from 'antd';
import { COMPANY_ID } from '../../utils/constants';
import { getPlantImages, uploadPlantImages } from '../../apis/Vendor/CompanyDetails';
import { convertBufferToBinary } from '../../utils/helper';
import { notification } from 'antd';
import del from './../../assets/del.png'


const Context = React.createContext({
    name: 'Default',
});

const ImageUpload = () => {

    const [fileList, setFileList] = useState([]);
    const [srcList, setSrcList] = useState([]);
    const [currentImage, setcurrentImage] = useState(null);
    const [api, contextHolder] = notification.useNotification();

    const deleteFile = []

    // const [currentImage, setCurrentImage] = useState

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
                            name: "Image_"+i,
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

            console.log(fileList)
            const newSrcList = fileList.map((item) => ({
                name: item.name,
                src: URL.createObjectURL(item.originFileObj),
                type: item.type,
                id: item.uid,
            }));
            setSrcList([...srcList,newSrcList]);
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
            if (res.success) {
                openNotification('topRight');
                fetchImages()
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    console.log(fileList)

    const handleCurrentImage = (item) => {
        setcurrentImage(item)
    }

    const handleDelete = (item) => {
        console.log(item)

        const files =  srcList.filter((file) => {
            if(file.name!=item.name)
                {
                    return file
                }
        })

        setFileList(files)
        deleteFile.push(item.name.split('_')[1])
    }

    

    return (
        <div>
            <Context.Provider value={contextValue}>
                {contextHolder}
                <Flex gap={50}>

                    <div>
                        <img src={currentImage?currentImage.src:''} style={{ height: "40vh", width: "30vw" }} />
                    </div>

                   
                    <div 
              style={{
                height: '20rem',
                width:'12rem',
                overflow: 'auto',
                // overflow:'hidden', 
                scrollbarWidth: 'none'
              }}>
                 <Flex vertical gap={'large'}>
                        {srcList.map((item, i) => (
                            <Card 
                            key={i} 
                            onClick={() => { handleCurrentImage(item) }} 
                            style={{
                                border: currentImage && currentImage.name && currentImage.name.includes('_') && i==currentImage.name.split('_')[1]?'1px solid green':''}}>
                                <Flex justify='space-around'>
                                <p style={{margin:'0px'}}>{item.name}</p> 
                                {/* <div
                                 onClick={() => { handleDelete(item) }}
                                 >
                                <img src={del} alt="My Icon" style={{ width: '30px', height: '30px' }} />
                                </div> */}
                                </Flex>
                            </Card>
                        ))}
                            </Flex>

                        </div>
                
                </Flex>


                <Flex vertical gap={40} align='center'>



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
