import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

/**
 * The mention rows are rendered by the host and styled by the host stylesheet, so
 * a few of the package rules exist purely to win against what hosts already have
 * on the page. These check that they still do.
 */
const PACKAGE_CSS = readFileSync(resolve(__dirname, '../src/styles/editor.css'), 'utf-8');

// The rule the Clockwork app ships globally for spinners.
const HOST_CSS = `
  .loading-spinner {
    animation: rotate-forever 1s linear infinite;
    height: 32px;
    width: 32px;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -16px 0 0 -16px;
  }
`;

const spinnerIn = (className: string): HTMLElement => {
  document.body.innerHTML = `
    <div class="cw-mentions-panel">
      <ul class="ck ck-reset ck-list ck-mentions cw-mentions">
        <li class="ck ck-list__item">
          <div class="${className} ck ck-button">
            <div class="loading-spinner"></div>
          </div>
        </li>
      </ul>
    </div>
  `;

  return document.querySelector('.loading-spinner') as HTMLElement;
};

describe('mention dropdown styling beats host overlay styles', () => {
  beforeAll(() => {
    const host = document.createElement('style');
    host.textContent = HOST_CSS;
    const own = document.createElement('style');
    own.textContent = PACKAGE_CSS;

    document.head.append(host, own);
  });

  it('control: the host rule really is in effect outside the panel', () => {
    // Without this, the assertions below would pass even if the cascade were not
    // being applied at all.
    document.body.innerHTML = '<div class="loading-spinner"></div>';

    expect(getComputedStyle(document.querySelector('.loading-spinner') as HTMLElement).position).toBe('absolute');
  });

  it('keeps a host overlay spinner in the flow of its row', () => {
    const spinner = spinnerIn('pagination-loading');
    const style = getComputedStyle(spinner);

    expect(style.position).toBe('static');
    expect(style.marginTop).toBe('0px');
    expect(style.left).toBe('auto');
  });

  it('applies to the first-page loader too', () => {
    const spinner = spinnerIn('feed-loading');

    expect(getComputedStyle(spinner).position).toBe('static');
  });
});
