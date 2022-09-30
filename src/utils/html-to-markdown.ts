// @ts-ignore
import TurndownService from 'turndown';
// @ts-ignore
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService();
// const gfm = turndownPluginGfm.gfm;

turndownService.use(gfm);

export function getSelectionHtml() {
    var html = '';
    if (typeof window.getSelection != 'undefined') {
        var sel: any = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement('div');
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof (document as any).selection != 'undefined') {
        if ((document as any).selection.type == 'Text') {
            html = (document as any).selection.createRange().htmlText;
        }
    }
    return html;
}

export function htmlToMarkdown(html: string) {
    return turndownService.turndown(html);
}
