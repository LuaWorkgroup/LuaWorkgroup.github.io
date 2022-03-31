# Lua Metatables

Lua is a minimalistic but powerful scripting language, that only provides few smart mechanisms and doesn't anything,
which gives us a lot of freedom. One of these mechanisms is the *metatable*. I don't even know if other languages have
such thing. Some people think that *metatables* are the Lua *classes*, but that is not really true. Yes, you can mimic OOP
using *metatables*, but as mentioned before Lua doesn't enforce anything and you can use them for whatever you can think of.

It is very helpful if you, the reader, have already understood ...

- tables
- functions
- nil

... otherwise this *metatable* introduction won't make much sense.

## The Basics

A *metatable* (let's call it `M`), is also just a simple table, but with [specific indices](https://www.lua.org/manual/5.4/manual.html#2.4)
and it has to be declared to be the *metatable* of "another" table (let's call that `T`) using the `setmetatable(T,M)` function. These specific
indices or metatable elements act as events. And when one of these events is triggered then Lua can execute something.
You can simply treat these indices as reserved for Lua metatables, and therefore not use them for anything else but
metatables, otherwise you would confuse people reading your code, and probably yourself too.

Let's see which events exist, and what would trigger these events.

- `__index` ➞ when you are accessing a key/index that is not present in the table T.
- `__newindex` ➞ when you are trying to create a new key/index inside the table T
- `__call` ➞ when you are calling a table like a function `T()`.
- Operators ➞ When you use an operator on 1 or 2 tables ...
    - `__add`   ➞ `t1 + t2`
    - `__sub`   ➞ `t1 - t2`
    - `__mul`   ➞ `t1 * t2`
    - `__div`   ➞ `t1 / t2`
    - `__mod`   ➞ `t1 % t2`
    - `__pow`   ➞ `t1 ^ t2`
    - `__unm`   ➞ `-t1`
    - `__idiv`  ➞ `t1 // t2`
    - `__band`  ➞ `t1 & t2`
    - `__bor`   ➞ `t1 | t2`
    - `__bxor`  ➞ `t1 ~ t2`
    - `__bnot`  ➞ `~t1`
    - `__shl`   ➞ `t1 << n`
    - `__shr`   ➞ `t1 >> n`
    - `__concat`➞ `t1 .. t2`
    - `__len`   ➞ `#t1`
    - `__eq`    ➞ `t1 == t2`
    - `__lt`    ➞ `t1 < t2`
    - `__le`    ➞ `t1 <= t2`

Okay, now let's write a small and almost finished code example that shows how to create a *metatable* and how to use `setmetatable()`.

    T = { }

    M =
    {
       __index    = <placeholder>,
       __newindex = <placeholder>,
       __call     = <placeholder>,
       __add      = <placeholder>,
    }

    setmetatable(T, M)

![setmetatable](img/setmetatable.png)


Now we have a metatable `M` that **is connected** to the table `T`. We defined some events in our *metatable*, so that it's clear
**when** to do something. And now only the actions are missing. The `<placeholder>`s are the actions - the "**what** to do"s.
And what do we usually associate with actions? - functions. All of them can be functions, but `__index` and `__newindex`
can also be tables instead of functions, which is actually pretty common.
But for now let's focus on the functions, that only print some text, and let's try to trigger these events.

    T = { }

    M =
    {
       __index    = function() print("this key does not exist in table T")      end,
       __newindex = function() print("you want to create a new key in table T") end,
       __call     = function() print("you are calling T like a function")       end,
       __add      = function() print("you are using the + operator")            end,
    }

    setmetatable(T, M)

    -- trigger the __index event by accessing a non-existing index
    local Foo = T.foo
    
    -- trigger the __newindex event by creating a new index
    T.foo = 123
    
    -- trigger the __call event by calling the table like a function
    T()
    
    -- trigger the __add event by providing tables as operands to the plus operator
    local Sum = T + T


If you execute this it prints ...

    this key does not exist in table T
    you want to create a new key in table T
    you are calling T like a function
    you are using the + operator


Now we have learned the very basics of *metatables*, but this is the most important part, because it explains the event
concept. At the moment the functions don't do much except for the printing, and therefore we will learn in the next chapter
about the parameters of the *"event-action"* functions we just created.

