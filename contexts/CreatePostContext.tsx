import { createContext, PropsWithChildren, useState } from "react";

interface IPhoto {
  format: string;
  uri: string;
  width: number;
  height: number;
}

interface IData {
  category?: string;
  type?: string;
  state?: string;
  description?: string;
  title?: string;
  price?: number;
  photos?: IPhoto[];
}

export interface ICreatePostContext {
  data?: IData;
  resetPostData(): void;
  setPostData(data: Partial<IData>): void;
}

interface ICreatePostProvider extends PropsWithChildren {}

export const CreatePostContext = createContext({} as ICreatePostContext);

export default function CreatePostProvider({ children }: ICreatePostProvider) {
  const [data, setData] = useState<IData>();

  const resetPostData = () => {
    setData(undefined);
  }

  const setPostData = (data: Partial<IData>) => {
    setData(oldState => ({ ...(oldState || {}), ...data }));
  }

  return (
    <CreatePostContext.Provider
      value={{
        data,
        resetPostData,
        setPostData
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
}
