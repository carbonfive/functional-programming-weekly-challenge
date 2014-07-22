{-# LANGUAGE FlexibleInstances #-}

module Main where

import Data.Char (isAlphaNum)




class MagicTypeclass t where
  combine :: [String] -> t




-- any String instantiates (behaves like a)
-- MagicTypeclass...
--
instance MagicTypeclass String where
  combine acc = filter (isAlphaNum) $ foldr (++) "" acc




-- a function that goes from something Show'able to a
-- value that instantiates MagicTypeclass is a
-- MagicTypeclass too...
--
instance (Show s, MagicTypeclass r) => MagicTypeclass (s -> r) where
  combine acc = \x -> combine (acc ++ [show x])




-- the type class constraint chooses the implementation
-- of the combine function... in this case, the second
--
g :: (MagicTypeclass t) => t
g = combine ["g"]




-- pure functions are interchangable with the values
-- that they return, so really these are just for
-- style++
--
o :: Char
o = 'o'

a :: Char
a = 'a'

l :: Char
l = 'l'




-- putStrLn expects a String, which causes the combine
-- function provided by the String instance of
-- MagicTypeclass to be called
--
main :: IO ()
main = do
  putStrLn $ g o o o o o o o o a l
  putStrLn $ g 0 0 0 'a' "lz"
  return ()
