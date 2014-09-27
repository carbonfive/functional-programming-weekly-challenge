{-# LANGUAGE FlexibleInstances #-}

class GoalStart a where g :: a

instance GoalStart (String -> String) where
  g s = 'g' : s
instance GoalArg x => GoalStart (() -> x) where
  g u = goalarg "go"

class GoalArg a where goalarg :: String -> a

instance GoalArg x => GoalArg (() -> x) where
  goalarg a x = goalarg (a ++ "o")
instance GoalArg (String -> String) where
  goalarg a s = a ++ s

main = do
  putStrLn $ if "g" == g""                        then "PASS" else "FAIL"
  putStrLn $ if "gal" == g"al"                    then "PASS" else "FAIL"
  putStrLn $ if "goal" == g()"al"                 then "PASS" else "FAIL"
  putStrLn $ if "goooooal!" == g()()()()()"al!"   then "PASS" else "FAIL"
  putStrLn $ if "goo" == g()()""                  then "PASS" else "FAIL"
  putStrLn $ if "goonies" == g()()"nies"          then "PASS" else "FAIL"
