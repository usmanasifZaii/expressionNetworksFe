import {
  EuiButton,
  EuiFieldText,
  EuiMarkdownEditor,
  EuiMarkdownParseError,
  EuiSelect,
  EuiSelectOption,
  EuiSpacer,
  EuiFormRow,
} from "@elastic/eui";
import {
  useState,
  ChangeEvent,
  FC,
  useEffect,
  useCallback,
  FormEvent,
  useRef,
} from "react";
import { IItem } from "../../utils/types";
import { addToast } from "../Toast/toast";
import { IItemForm } from "./types";
import ItemService from "../../services/item.service";
import moment from "moment";
import { useNavigate } from "react-router";

const ItemForm: FC<IItemForm> = ({ type, item }) => {
  const [state, setState] = useState<IItem>({
    date: "",
    type: "",
    description: " ",
    title: "",
  });

  const firstRender = useRef(true);
  const [itemTypes, setItemTypes] = useState<Array<EuiSelectOption>>([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTypes();
    getPersistedData();
  }, []);

  useEffect(() => {
    setItem();
  }, [item]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else persistData();
  }, [state]);

  const setItem = () => {
    const temp = { ...item };
    temp.date = moment(item?.date).format("yyyy-MM-DD");
    console.log(temp.date);
    if (type === "edit") setState((prev) => ({ ...prev, ...temp }));
  };

  const fetchTypes = async () => {
    const { data, error, hasError } = await ItemService.getItemTypes();
    if (hasError) {
      addToast({
        title: error?.message || error,
        color: "danger",
        text: "",
      });
      return;
    }
    setItemTypes(data?.map((item: string) => ({ value: item, text: item })));
  };

  const getPersistedData = () => {
    if (type === "edit") return;

    const data = localStorage.getItem("createItem");
    if (data) {
      setState(JSON.parse(data));
    }
  };

  const persistData = () => {
    if (type === "create") {
      localStorage.setItem(`createItem`, JSON.stringify(state));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  const onParse = useCallback(
    (err: EuiMarkdownParseError | null, { messages }: { messages: any }) => {
      setMessages(err ? [err] : messages);
    },
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "edit") {
      updateItem();
    } else {
      createNewItem();
    }
  };

  const reset = () => {
    setState({
      date: "",
      type: "",
      description: " ",
      title: "",
    });
  };

  const createNewItem = async () => {
    const { error, hasError } = await ItemService.createItem(state);
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
      reset();
      return;
    }
  };

  const updateItem = async () => {
    const { error, hasError } = await ItemService.updateItem(state);
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
      navigate("/");
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <EuiFormRow label="Title">
          <EuiFieldText
            placeholder="Title"
            name="title"
            required={true}
            value={state.title}
            onChange={handleChange}
            aria-label="Use aria labels when no actual label is in use"
          />
        </EuiFormRow>
        <EuiSpacer size="l" />
        <EuiFormRow label="Date">
          <input
            type="date"
            name="date"
            required={true}
            value={state.date}
            onChange={handleChange}
          />
        </EuiFormRow>
        <EuiSpacer size="l" />
        <EuiFormRow label="Type">
          <EuiSelect
            name="type"
            options={itemTypes}
            value={state.type}
            onChange={handleChange}
          />
        </EuiFormRow>
        <EuiSpacer size="l" />
        <EuiFormRow label="Description">
          <EuiMarkdownEditor
            aria-required="true"
            aria-label="EUI markdown editor"
            placeholder="Your markdown here..."
            value={state.description}
            onChange={(val) =>
              setState((prev) => ({ ...prev, description: val }))
            }
            height={400}
            onParse={onParse}
            errors={messages}
          />
        </EuiFormRow>
        <EuiButton color={"accent"} type="submit">
          {type === "edit" ? "Update" : "Create"}
        </EuiButton>
      </form>
    </div>
  );
};

export default ItemForm;
