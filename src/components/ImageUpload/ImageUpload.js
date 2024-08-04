import { useState, useEffect } from 'react'
import { Upload, Carousel, Empty } from 'antd';
import { notification } from 'antd';
import { LinearProgress } from '@mui/material'
import { PlusOutlined } from '@ant-design/icons';
import { NOTIFICATION_MESSAGES } from '../../utils/locale';
import { OPEN_ROUTES, PRODUCT_URL_PATTERN } from '../../utils/constants';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const ImageUpload = (props) => {

    const [fileList, setFileList] = useState([]);
    const [api] = notification.useNotification();
    const [loading, setLoading] = useState(false)
    const [notShow, setShow] = useState(false)


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    const openNotification = (placement) => {
        api.success({
            message: `Success`,
            description: NOTIFICATION_MESSAGES.UPLOAD_PLANT_IMAGES,
            placement,
        });
    };


    const openFailedNotification = (placement, message) => {
        api.error({
            message: `Something went wrong`,
            description: message,
            placement,
        });
    };


    const deleteNotification = (placement, message) => {
        api.success({
            message: `Success`,
            description: message,
            placement,
        });
    };


    const fetchImages = async () => {
        setLoading(true)
        try {
            const newSrcList = await props.getImages()

            setFileList(newSrcList);
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            openFailedNotification('topRight', NOTIFICATION_MESSAGES.FETCH_IMAGE_ERROR)
            return err
        }
    }


    useEffect(() => {
        const path = window.location.pathname
        if (path == OPEN_ROUTES.VENDOR_DASHBOARD || PRODUCT_URL_PATTERN.test(path))
            setShow(true)
        fetchImages()

    }, [])


    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };


    const uploadImage = async options => {

        const { onSuccess } = options;
        try {
            const res = await props.uploadImages(fileList)
            if (res.success) {
                openNotification('topRight');
                fetchImages()
            }
            onSuccess("Ok");
        } catch (err) {
            openFailedNotification('topRight', NOTIFICATION_MESSAGES.UPLOAD_IMAGE_ERROR)

            const error = new Error("Some error");
        }
    };


    const handleDelete = async (file) => {
        const filesList = fileList.filter((item) => {
            return item.uid == file.uid
        })

        try {
            const res = await props.uploadImages(filesList)
            if (res.success) {
                deleteNotification('topRight', NOTIFICATION_MESSAGES.DELETE_PLANT_IMAGES);
                fetchImages()

            }

        } catch (err) {
            const error = new Error("Some error");
        }
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload Images
            </div>
        </button>
    );


    return (
        <div>
            {loading ?
                <div style={{ height: '50vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LinearProgress style={{ width: '50%' }} />
                </div>
                : <div>
                    {fileList && fileList.length > 0 ? <Carousel arrows autoplay fade dotPosition="left" arrowSize={35} style={{ marginBottom: '10px' }}>

                        {fileList && fileList.map((item, i) => (
                            <div>
                                <img src={item.url} style={{ height: "50vh", width: "80vw" }} />
                            </div>

                        ))}
                    </Carousel> : <Empty />}
                    {notShow ? null : <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        customRequest={uploadImage}
                        onChange={onChange}
                        onRemove={(file) => {
                            handleDelete(file)
                        }}
                    >
                        {fileList && fileList.length >= 8 ? null : uploadButton}
                    </Upload>}
                    {/* {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )} */}

                </div>}
        </div>
    )
}

export default ImageUpload

