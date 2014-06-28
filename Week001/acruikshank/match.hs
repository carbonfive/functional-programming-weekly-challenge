match :: String -> String -> Int -> Bool
match s pattern n = match' s pattern n where
  match' _ [] 0 = False
  match' s [] n = match' s pattern (n-1)
  match' [] _ 0 = True
  match' [] _ _ = False
  match' (s:ss) (p:ps) n
    | s == p = match' ss ps n
    | otherwise = match' ss (p:ps) n

main = do
  if not (match "abcabc" "abc" 1)       then putStrLn "PASS" else putStrLn "FAIL"
  if match "abcabc" "abc" 2             then putStrLn "PASS" else putStrLn "FAIL"
  if match "Hello Jello" "ello" 2       then putStrLn "PASS" else putStrLn "FAIL"
  if not (match "Hello Jello" "ello" 3) then putStrLn "PASS" else putStrLn "FAIL"
  if not (match "Ratatattat" "at" 3)    then putStrLn "PASS" else putStrLn "FAIL"
  if match "Ratatattat" "at" 4          then putStrLn "PASS" else putStrLn "FAIL"
  if not (match "oooo" "ooo" 2)         then putStrLn "PASS" else putStrLn "FAIL"