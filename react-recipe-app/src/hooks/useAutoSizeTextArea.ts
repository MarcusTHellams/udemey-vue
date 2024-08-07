import { type MutableRefObject, useCallback, useLayoutEffect } from 'react';
import { useEvent } from 'react-use';


export const useAutoSizeTextArea = (
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>,
  value: string,
) => {
  const resizeFunction = useCallback(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef]);

  useEvent('resize', resizeFunction, window, { capture: true });
  // this will calculate the height of textArea before DOM paints
  useLayoutEffect(() => {
    resizeFunction();
  }, [resizeFunction, value]);
};
