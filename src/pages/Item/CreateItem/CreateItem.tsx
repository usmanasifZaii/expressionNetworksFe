import ItemForm from "../../../components/ItemForm/ItemForm";
import { ITEM_FORM_TYPES } from "../../../utils/constants";
const CreateItem = () => {
  return <ItemForm type={ITEM_FORM_TYPES.CREATE} />;
};

export default CreateItem;
