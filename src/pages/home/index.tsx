import {Button, message} from "antd";
import {useEffect} from "react";
import fetch from "@toolkit-fe/request";
import {useRequest} from "ahooks";
import {Card} from "antd";
const {Meta} = Card;
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
  const {loading: fetchLoading, data} = useRequest(() => {
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
        {/* <img
          src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/statics/common/24385370.jpeg"
          className="inline-block h-8 w-8 rounded-2xl"
        /> */}
        <div className="font-semibold text-lg">Apphub</div>
      </div>
      <div className="px-4">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
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
      {/* <div className="flex flex-wrap p-4 items-start">
        {data?.map((item) => {
					return (
            <div className="rounded-t-xl mr-2 w-28 overflow-hidden mb-8"
							style={{
								fontSize: 0
							}}
						>
              <img className="inline-block w-full" src={item.icon} />
              <div className='border-t-0 border border-solid border-[#ddd] rounded-b-xl'>
                <div className="font-semibold p-2 ellipsis-single text-base">
                  {item.title}
                </div>
                <div className="ellipsis-single p-2 text-sm">
                  {item.description}
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default Home;
