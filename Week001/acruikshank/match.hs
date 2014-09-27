prefix :: String -> String -> Maybe String
prefix s [] = Just s
prefix [] p = Nothing
prefix (s:ss) (p:ps)
  | s == p = prefix ss ps
  | otherwise = Nothing

match :: String -> String -> Int -> Bool
match [] pattern n = n == 0
match (s:ss) pattern n = case (prefix (s:ss) pattern) of
  Nothing -> match ss pattern n
  Just rest -> match rest pattern (n-1)

main = do
  if not (match "abcabc" "abc" 1)       then putStrLn "PASS" else putStrLn "FAIL"
  if match "abcabc" "abc" 2             then putStrLn "PASS" else putStrLn "FAIL"
  if match "Hello Jello" "ello" 2       then putStrLn "PASS" else putStrLn "FAIL"
  if not (match "Hello Jello" "ello" 3) then putStrLn "PASS" else putStrLn "FAIL"
  if not (match "Ratatattat" "at" 3)    then putStrLn "PASS" else putStrLn "FAIL"
  if match "Ratatattat" "at" 4          then putStrLn "PASS" else putStrLn "FAIL"
  if not (match "oooo" "ooo" 2)         then putStrLn "PASS" else putStrLn "FAIL"
  if not (match "faaaaat" "fat" 1)      then putStrLn "PASS" else putStrLn "FAIL"
  if (match "eeep" "eep" 1)             then putStrLn "PASS" else putStrLn "FAIL"
