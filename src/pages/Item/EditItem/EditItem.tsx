import { useEffect, useState } from "react";
import { useParams } from "react-router";

import ItemForm from "../../../components/ItemForm/ItemForm";
import { addToast } from "../../../components/Toast/toast";
import ItemService from "../../../services/item.service";
import { IItem } from "../../../utils/types";
import { ITEM_FORM_TYPES } from "../../../utils/constants";

const EditItem = () => {
  const [item, setItem] = useState<IItem>({
    date: "",
    type: "",
    description: " ",
    title: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    const { data, error, hasError } = await ItemService.getItem(id || "");
    if (hasError) {
      addToast({
        title: error?.message || error,
        color: "danger",
        text: "",
      });
      return;
    }

    setItem(data);
  };

  return <ItemForm type={ITEM_FORM_TYPES.EDIT} item={item} />;
};

export default EditItem;
