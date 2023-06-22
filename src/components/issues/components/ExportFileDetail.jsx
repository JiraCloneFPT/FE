import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useParams } from "react-router-dom";
import { ExportFileService } from "../../../services/ExportService";

const items = [
    {
        label: "Word",
        key: "1",
    },
];

export default function ExportFileDetail() {
    const { id } = useParams();
    const handleMenuClick = async () => {
        const result = await ExportFileService(id, "word");
        const blobURL = URL.createObjectURL(new Blob([result]));
        const a = document.createElement("a");
        a.href = blobURL;
        a.download = `${new Date().toLocaleDateString()}|${new Date().toLocaleTimeString()}.docx`;
        a.click();
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <Dropdown menu={menuProps}>
                <Button type="default" style={{ backgroundColor: "#ECEDF0" }}>
                    <Space>
                        Export
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </>
    );
}
