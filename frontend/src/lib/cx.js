/**
 * cx is a simple utility to join class names together.
 * Similar to `classnames`, but lightweight and custom.
 *
 * @example
 * cx('btn', 'active')                      // => 'btn active'
 * cx('btn', isPrimary && 'btn-primary')    // => 'btn btn-primary' (if isPrimary is true)
 * cx('p-4', false && 'hidden')             // => 'p-4'
 */

export const cx = (...classes) => {
    return classes
      .filter((cls) => typeof cls === 'string' && cls.trim() !== '')
      .map((cls) => cls.trim())
      .join(' ');
  };
  