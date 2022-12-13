/**
 * @summary 计算 panel 展示位置
 */
export const calcPosition = (e: MouseEvent) => {
    let x;
    let y;
    let maxHeight;
    let isTop = true;
    const { clientX, clientY, pageY } = e;

    const { innerHeight, innerWidth } = window;

    const offsetX = innerWidth - clientX - 550;

    if (offsetX <= 0) {
        x = clientX + offsetX - 30;
    } else {
        x = clientX - 10;
    }

    // 大于百分之六指高度时弹框出现在上面
    if (clientY > innerHeight * 0.6) {
        isTop = false;
        y = pageY - 30;
        maxHeight = innerHeight - (innerHeight - clientY + 30) - 10;
    } else {
        y = pageY + 15;
        maxHeight = innerHeight - (clientY + 15) - 10;
    }

    return {
        panelX: x + 'px',
        panelY: y + 'px',
        buttonX: clientX + 38 + 'px',
        buttonY: pageY + 9 + 'px',
        isTop,
        maxHeight: maxHeight + 'px',
    };
};

export const dateFormat = () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
