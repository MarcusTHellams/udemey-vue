import { nextTick, onBeforeUnmount, onMounted } from 'vue';

export const useAutoSizeTextArea = (selector: string) => {
  const callBack = async (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '0px';
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + 'px';
    await nextTick();
  };

  const callBack2 = () => {
    const textarea = document.querySelector(selector) as HTMLTextAreaElement;
    textarea.style.height = '0px';
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + 'px';
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
