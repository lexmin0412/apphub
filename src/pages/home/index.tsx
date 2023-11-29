import fetch from "@toolkit-fe/request";
import {useRequest} from "ahooks";
import {Avatar, List} from "antd";
import { RightOutlined }  from '@ant-design/icons'

interface DataType {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
}

interface Result {
  list: DataType[];
}

function Home() {
  const { data} = useRequest(() => {
    return new Promise((resolve) => {
      fetch(
        "https://lexmin.oss-cn-hangzhou.aliyuncs.com/apis/apphub/data.json",
        {}
      ).then((data) => {
        resolve((data as Result).list);
      });
    }) as Promise<DataType[]>;
  });

	console.log("data111", data);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex items-center h-12 px-4">
        <div className="font-semibold text-lg">Apphub</div>
      </div>
      <div className="px-4">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              className="cursor-pointer"
              onClick={() => {
                window.open(item.url);
              }}
              actions={[
                <div className="flex items-center text-[#1677ff]">
                  前往 <RightOutlined className="ml-1" />
                </div>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.icon} />}
                title={
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Home;
