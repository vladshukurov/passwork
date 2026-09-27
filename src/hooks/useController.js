import { useEffect, useRef } from 'react';

// Attaches an imperative controller (GSAP, dashboard engine) to the element
// behind the returned ref. The controller returns its own teardown.
export function useController(mount, deps = []) {
  const ref = useRef(null);
  useEffect(() => (ref.current ? mount(ref.current) : undefined), deps); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}
