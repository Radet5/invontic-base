import {
  useState,
  useReducer,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import axios from "axios";

interface UseApiProps {
  initialUrl: string;
  initialData?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  runOnMount?: boolean;
}

interface ApiReducerState {
  isLoading: boolean;
  isError: boolean;
  data: any;
}

interface ApiReducerAction {
  type: string;
  payload?: any;
}

const apiReducer = (state: ApiReducerState, action: ApiReducerAction) => {
  switch (action.type) {
    case "API_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "API_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "API_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

export const useApi = ({
  initialUrl,
  initialData,
  method,
  runOnMount,
}: UseApiProps): [
  ApiReducerState,
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<any>>
] => {
  const [url, setUrl] = useState(initialUrl);
  const [payload, setPayload] = useState({});
  const enabled = useRef(runOnMount);

  const [state, dispatch] = useReducer(apiReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
    error: "",
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "API_INIT" });

      try {
        let result;
        switch (method) {
          case "GET":
            result = await axios.get(url);
            break;
          case "POST":
            result = await axios.post(url, payload);
            break;
          case "PUT":
            result = await axios.put(url, payload);
            break;
          case "DELETE":
            result = await axios.delete(url);
            break;
          default:
            result = await axios.get(url);
        }

        if (!didCancel) {
          dispatch({ type: "API_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "API_FAILURE", payload: error });
        }
      }
    };

    if (enabled.current) {
      fetchData();
    } else {
      enabled.current = true;
    }

    return () => {
      didCancel = true;
    };
  }, [url, method, payload]);

  return [state, setUrl, setPayload];
};
