### Why use useMemo here?
- If you don’t use useMemo, then every render will recalculate these stats — even if tasks didn't change. That’s inefficient, especially when:

- The list is large

- The stats calculation is expensive
