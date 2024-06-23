import { useState, useEffect } from 'react'
import { Upload, Image } from 'antd';
import { COMPANY_ID } from '../../utils/constants';
import { convertBufferToBinary } from '../../utils/helper';
import { notification } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { MESSAGES } from '../../utils/locale';


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


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    const openNotification = (placement) => {
        api.success({
            message: `Success`,
            description: MESSAGES.UPLOAD_PLANT_IMAGES,
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
        try {
            const newSrcList = await props.getImages(COMPANY_ID)
            
            setFileList(newSrcList);
        }
        catch (err) {
            openFailedNotification('topRight', MESSAGES.FETCH_IMAGE_ERROR)
            return err
        }
    }


    useEffect(() => {
        fetchImages()

    }, [])


    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };


    const uploadImage = async options => {

        const { onSuccess } = options;
        try {
            const res = await props.uploadImages(COMPANY_ID, fileList)
            console.log(res)
            if (res.success) {
                openNotification('topRight');
                fetchImages()
            }
            onSuccess("Ok");
            console.log("server res: ", res);
        } catch (err) {
            openFailedNotification('topRight', MESSAGES.UPLOAD_IMAGE_ERROR)
            console.log("Eroor: ", err);
            const error = new Error("Some error");
        }
    };


    const handleDelete = async (file) => {
        const filesList = fileList.filter((item) => {
            return item.uid == file.uid
        })

        try {
            const res = await props.uploadImages(COMPANY_ID, filesList)
            if (res.success) {
                deleteNotification('topRight', MESSAGES.DELETE_PLANT_IMAGES);
                fetchImages()
            }
            console.log("server res: ", res);
        } catch (err) {
            console.log("Eroor: ", err);
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
                Upload
            </div>
        </button>
    );
    return (
        <div>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                customRequest={uploadImage}
                onChange={onChange}
                onRemove={(file) => {
                    handleDelete(file)
                }}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}

        </div>
    )
}

export default ImageUpload

