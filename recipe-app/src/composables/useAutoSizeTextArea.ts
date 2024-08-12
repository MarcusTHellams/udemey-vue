import { nextTick, onBeforeUnmount, onMounted } from 'vue';

export const useAutoSizeTextArea = (selector: string) => {
  const resizeTextArea = (target: HTMLTextAreaElement) => {
    target.style.height = '0px';
    const scrollHeight = target.scrollHeight;
    target.style.height = scrollHeight + 20 + 'px';
  };

  const callBack = async (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    resizeTextArea(textarea);
    await nextTick();
  };

  const callBack2 = () => {
    const textarea = document.querySelector(selector) as HTMLTextAreaElement;
    resizeTextArea(textarea);
  };

  onMounted(async () => {
    document.querySelector(selector)?.addEventListener('input', callBack);
    window.addEventListener('resize', callBack2);
    await nextTick();
    window.dispatchEvent(new Event('resize'));
  });

  onBeforeUnmount(() => {
    document.getElementById('description')?.removeEventListener('input', callBack);
    window.removeEventListener('resize', callBack2);
  });
};
