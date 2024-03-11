# Forego README

## What is Forego?

Forego wants to be a set of tools to ease building web apps without incurring
in unnecessary, unwanted or hidden complexity.

Right now is just a barebones implementation of a JSX runtime which allows the
generation of DOM objects from HTML code embedded within Javascript using JSX.

This JSX runtime doesn't provide (by design) any hidden functionality on the
objects generated, they are just plain DOM objects. It's the implementer's
responsibility managing the state of these objects, by any means or strategy
they wish to implement, with no caveats nor impositions.

There's right now only one special feature in the JSX runtime, which might or
might not make it in the final version. It currently also accepts a callback
for both attributes and children elements, which is called with a setter
function. The setter function may be called at anytime to change the value of
the corresponding attribute or elements.

Keep in mind that this means that special care must be taken for this use case
so as not to cause memory leaks. The setter function should be discarded when
not needed anymore, as keeping it stored would also keep the created DOM
elements in memory.

Of particular note keep in mind that for the implementation of this special
case for children elements, the runtime creates two empty text nodes as markers
of the range within the DOM tree that is to be changed each time the setter is
called. This goes against the design philosophy of "no side effects" so it
might get removed if a fix for this isn't found.
