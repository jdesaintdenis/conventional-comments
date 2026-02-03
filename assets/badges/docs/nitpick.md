# Nitpick

![nitpick](../nitpick/nitpick.svg)

Nitpicks are trivial preference-based requests. These should be non-blocking by nature.

## Possible decorations

### Non-blocking
![nitpick(non-blocking)](../nitpick/nitpick-non_blocking.svg)

A comment with this decoration should not prevent the subject under review from being accepted. This is helpful for organizations that consider comments blocking by default.

### Blocking

![nitpick(blocking)](../nitpick/nitpick-blocking.svg)

A comment with this decoration should prevent the subject under review from being accepted, until it is resolved. This is helpful for organizations that consider comments non-blocking by default.

### If minor

![nitpick(if-minor)](../nitpick/nitpick-if_minor.svg)

This decoration gives some freedom to the author that they should resolve the comment only if the changes end up being minor or trivial.
