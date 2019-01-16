removeNonUppercase :: [Char] -> [Char]
removeNonUppercase st = [c | c <- st, c `elem` ['A'..'Z']]

addThree :: Integer -> Integer -> Integer -> Integer
addThree x y z = x + y + z