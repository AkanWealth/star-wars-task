import store from '../../hooks/store';
import { Key, useCallback, useState } from 'react';
import {
  Radio,
  RadioChangeEvent,
  Table,
  TableColumnsType,
} from 'antd';

interface DataType {
  key: Key;
  name: string;
  gender: string | JSX.Element;
  height: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    defaultSortOrder: 'ascend',
    sorter: (a: any, b: any) => a.gender.length - b.gender.length,
  },
  {
    title: 'Height',
    dataIndex: 'height',
  },
];

const CharacterTable = () => {
  const [gender, setGender] = useState('all');
  const data = store((state) => state.characterDetails);

  const handleGenderChange = useCallback((e: RadioChangeEvent) => {
    setGender(e.target.value);
  }, []);

  return (
    <>
      <div className="flex mt-3 items-center justify-center">
        <p className="pr-2">Gender: </p>
        <Radio.Group onChange={handleGenderChange} value={gender}>
          <div className="flex">
            <Radio className="" value="M">
              Male
            </Radio>
            <Radio className="" value="F">
              Female
            </Radio>
            <Radio className="" value="all">
              All
            </Radio>
          </div>
        </Radio.Group>
      </div>
      <Table
        className="my-10 sm:mx-20"
        columns={columns}
        dataSource={
          (gender === 'M' && data.filter((item) => item.gender === 'M')) ||
          (gender === 'F' && data.filter((item) => item.gender === 'F')) ||
          data
        }
        scroll={{ x: 300, y: 200 }}
        bordered
        summary={(val) => {
          const data = val?.reduce((a, b) => a + Number(b.height), 0);
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  {val?.length <= 1
                    ? `${val?.length} Character`
                    : `${val?.length} Characters`}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  {data} cm ({Math.floor((data * 0.3937) / 12)}ft/
                  {Math.round(
                    ((data * 0.3937) / 12 -
                      Math.floor((data * 0.3937) / 12)) *
                      12
                  )}
                  in)
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </>
  );
};

export default CharacterTable;
