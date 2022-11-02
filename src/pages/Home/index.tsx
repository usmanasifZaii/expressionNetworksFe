import React, { useState, Fragment, useEffect } from "react";
import {
  EuiBasicTable,
  EuiButton,
  EuiSpacer,
  EuiBasicTableColumn,
  CriteriaWithPagination,
} from "@elastic/eui";
import ItemService from "../../services/item.service";
import { addToast } from "../../components/Toast/toast";
import { IItem } from "../../utils/types";
import { useNavigate } from "react-router";
import moment from "moment";

const Home = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState<Array<IItem>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllItems();
  }, [pageIndex]);

  const fetchAllItems = async () => {
    const { data } = await ItemService.getAllItems({
      pageSize,
      currentPage: pageIndex + 1,
    });
    setItems(data?.items);
    setTotalItems(data?.totalCount);
  };

  const onTableChange = (data: CriteriaWithPagination<IItem>) => {
    const { index: pageIndex, size: pageSize } = data.page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  const deleteUser = async (item: IItem) => {
    const { error, hasError } = await ItemService.deleteItem(item._id || "");

    if (hasError) {
      addToast({
        title: error?.message || error,
        color: "danger",
        text: "",
      });
      return;
    } else {
      addToast({
        title: "Success",
        color: "success",
        text: "",
      });
      setItems(items.filter((itm) => itm._id !== item._id));
      return;
    }
  };

  const editItem = (item: IItem) => {
    navigate("/items/edit/" + item._id);
  };

  const columns: EuiBasicTableColumn<IItem>[] = [
    {
      field: "title",
      name: "Title",
      truncateText: true,
      sortable: true,
    },
    {
      field: "date",
      name: "Date",
      truncateText: true,
      render: (val: string) => moment(val).format("YYYY-MM-DD"),
    },
    {
      field: "description",
      name: "Description",
      truncateText: true,
    },
    {
      field: "type",
      name: "Type",
      truncateText: true,
    },
    {
      name: "Actions",
      actions: [
        {
          name: "Edit",
          description: "Edit this item",
          icon: "copy",
          type: "icon",
          onClick: editItem,
        },
        {
          name: "Delete",
          description: "Delete this item",
          icon: "trash",
          type: "icon",
          color: "danger",
          onClick: deleteUser,
        },
      ],
    },
  ];

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItems,
    pageSizeOptions: [3, 5, 8],
  };

  return (
    <Fragment>
      <EuiSpacer size="l" />
      <EuiButton
        color={"accent"}
        onClick={() => {
          navigate("/item/create");
        }}
      >
        Create Item
      </EuiButton>
      <EuiSpacer size="l" />
      <h1>List of Items</h1>
      <EuiBasicTable
        tableCaption="Demo for responsive EuiBasicTable with mobile options"
        items={items}
        itemId="_id"
        columns={columns}
        pagination={pagination}
        hasActions={true}
        responsive={true}
        onChange={onTableChange}
      />
    </Fragment>
  );
};

export default Home;
