# # More 입력과 출력
---

## 파일과 스트림
* 스트림(stream)은 프로그램을 시작하거나 종료하는 데이터의 연속된 조각이다.

### 입력 리다이렉션
* 텍스트 파일의 내용을 입력 받을 때, 입력 리다이렉션(input redirection)을 사용
```haskell
Import Control.Monad
Import Data.Char

Main = forever $ do
	l <- getLine
	putStrLn $ map toUpper l
```
```haskell
$ ghc —make capslocker
$ ./capslocker < haiku.txt
```
### 입력 스트림에서 문자열 얻기
* 입력 스트램 처리를 쉽게 만들어주는 I/O 작업(getContents)
* getContents: 표준 압력으로부터 EOF문자를 만날 때까지의 모든 것을 읽는다.
* IO String 타입
* Lazy하다.
```haskell
Import Data.Char

Main = do
	contents <- getContents
	putStr $ map toUpper contents
```
> Main에서 forever $ do 할 필요가 없음

### 입력 변형하기
* Interact: 입력에서 문자열을 얻고, 그것을 함수에 넣고 결과를 출력하는 패턴을 제공하는 함수
* Interact:: String -> Strirng
```Haskell
Main = interact shortLinesOnly

ShortLinesOnly :: String -> String
ShortLinesOnly = unlines . Filter (\line -> length line < 10)  . Lines
```
---

## 파일 읽기와 쓰기
* 표준 출력: stdout, 표준 입력: Stein
```haskell
Import System.IO

Main = do
	handle <- openFile “girlfriend.txt” ReadMode
	contents <- hGetContents handle
	putStr contents
	hClose handle
```
* OpenFile: 파일 경로와 IOMode를 받아서 파일을 열고, 그 파일과 연관된 핸들을 만드는 I/O 작업을 반환한다.
* OpenFile :: FilePath -> IOMode -> IO Handle
* Type FilePath = String
* Data IOMode = ReadMode | WriteMode | AppendMode | ReadWriteMode
* GetContents와 유사 (차이는 파일이 아닌 핸들을 받는다)

### WithFile 함수 이용하기
* withFile :: FilePath -> IOMode -> (Handle -> IO a) -> IO a
* 파일에 대한 경로와 IOMode, 핸들을 받아서 어떤 I/O 작업을 반환하는 함수를 받는다.
* 그리고 파일을 열고, 작업한 다음, 닫는 I/O를 반환한다.
```haskell
import System.IO

main = do
	withFile “girlfriend.txt” ReadMode (\handle -> do
		contents <= hGetContents handle
		putStr contents)
```
> Close 할 필요가 없다.

### Bracket 타임
* 입출력 작업중에 예외(exception)를 처리하기 위해 Contro.Exception모듈은 bracket 함수 제공
* bracket :: IO a -> (a -> IO b) -> (a -> IO c) -> IO c
* 첫 번째 매개변수: 파일 핸들러 같은 리소스를 얻는 I/O 작업
* 두 번째 매개변수: 리소스를 해제(release)하는 함수
* 세 번째 매개변수: 그 리소스를 받아서 그것으로 어떤 작업을 하는 함수
```Haskell
withFile :: FilePath -> IOMode -> (Handle -> IO a) -> IO a
withFile name mode f = bracket (openFile name mode)
	(\handle -> hClose handle)
	(\handle -> f handle)
```

### 핸들을 잡아라!
* 핸들을 다루는 함수들은 표준 입력, 표준 출력이 아닌 특정 파일에 작업을 한다.
* readFile :: FilePath -> IO String
```haskell
import System.IO

main = do
	contents <- readFile “girlfriend.txt”
	putStr contents
```
> readFile = (openFiile “파일명” ReadMode”)
> 핸들을 사용하지 않기 때문에, 자동으로 닫을 수 없다.
* writeFile :: FilePath -> String -> IO ()
```haskell
import System.IO
import Data.char

main = do
	contents <- readFile “girlfriend.txt”
	writeFile “girlfriendcaps.txt” (map toUpper contents)
```
---

## To-do 리스트
```haskell
import System.IO

main = do
	todoItem <- getLine
	appendFile “todo.txt” (todoItem ++ “/n”)
```

### 항목 삭제하기
```haskell
import System.IO
import System.Directory
import Data.List

main = do
	contents <- readFile “todo.txt”
	let todoTasks = line contents
		numberedTasks = zipWith (/n line -> show n ++ “ - “ + line)
									[0..] todoTasks
	putStrLn “These are your TO-DO items:”
	mapM_ putStrLn numberedTasks
	putStrLn “Which one do you want to delete?”
	numberString <- getLine
	let number = read numberString
		newTodoItems = unlines $ delete (todoTasks !! number) todoTasks
	(tempName, tempHandle) <- openTempFile “.” “temp”
	hPutStr tempHandle newTodoItems
	hClose tempHandle
	removeFile “todo.txt”
	renameFile tempName “todo.txt” 
```
* openTempFile: 임시 경로와 임시 파일명을 받아서 임시 파일을 여는 함수

### 정리하기
* Control.Exception의 bracketOnError 함수: 예외가 발생할 때만 정리 작업 수행(번역??)
```haskell
import System.IO
import System.Directory
import Data.List
import Control.Exception

main = do
	contents <- readFile “todo.txt”
	let todoTasks = lines contents
		numberedTasks = zipWith (/n line -> show n ++ “ - “ ++ line)
									[0..] todoTasks
	putStrLn “These are your TO-DO items:”
	mapM_ putStrLn numberedTasks
	putStrLn “Which one do you want do delete?”
	numberString <- getLine
	let number = read numberString
		newTodoItems = unlines $ delete (todoTasks !! number) todoTasks
	bracketOnError (openTempFile “.” “temp”)
		(\(tempName, tempHandle) -> do
			hClose tempHandle
			remodeFile tempName
		(\(tempName, tempHandle) -> do
			hPutStr tempHandle newTodoItems
			hClose tempHandle
			removeFile “todo.txt”
			renameFile tempName “todo.txt”)
```
---

## 커맨드 라인 인자
* 하스켈은 터미널에서 실행되는 스크립트나 애플리케이션을 만들 수 있게, 커맨드 라인 인자를 다루는 방법을 제공한다.
* 인터렉티브(interactive) 프로그램: 사용자가 프로그램을 실행하고, 프로그램이 사용자에게 어떤 것을 물을 때까지 기다린 다음, 프로그램에 입력값을 전달. (상호작용?)
* System.Environment는 getArgs, getProgName 제공
* getArgs :: IO [String] - 인자들의 리스트를 만들어내는 I/O
* getProgName :: IO String - 프로그램 이름을 만들어내는 I/O
```
import System.Environment
import Data.List
main = do
	args <- getArgs
	progName <- getProgName
	putStrLn “The arguments are:”
	mapM putStrLn args
	putStrLn “The program name is:”
	putStrLn progName
```
---

## 할 일 리스트 가지고 놀기

### 멀티태스킹 할 일 리스트
```
import System.Environment
import System.Directory
import System.IO
import Data.List

dispatch :: String -> [String] -> IO ()
dispatch “add” = add
dispatch “view” = view
dispatch “remove” = remove
```

### 잘못된 입력 처리하기
```
dispatch :: String -> [String] -> IO()
dispatch “add” = add
dispatch “view” = view
dispatch “remove” = remove
dispatch command = doesntExist command
```
> dispatch 함수의 끝에 포괄적인 패턴(command)을 추가하여, 잘못된 명령이 입력됐을 때 입력한 명령이 없음으로 알려주고 인자리스트를 무시하는 함수 반환
---

## 랜덤
* 참조 투명성: 함수의 반환같이 입력값으로만 완전히 결정되는 것
* random :: (RandomGen g, Random a) => g -> (a, g)
* random은 랜덤 값과 생성기를 반환한다.
```
random (mkStdGen 100) :: (Int, StrGen)
```

-### 동전 던지기-
### 더 많은 랜덤 함수들
```
take 5 $ randoms (mkStdGen 11) :: [Int]
```
```
randomR (1,6) (mkStdGen 359353)
```
```
take 10 $ randomRs (‘a’, ‘z’) (mkStdGen 3) :: [Char]
```

-### 랜덤과 I/O-
---

## 바이트스트링
* 문자열처럼 파일을 처리(느긋한 처리)하면 느려지는 단점이 있다.
* 바이트스트링(bytestring)은 각각의 요소가 한 바이트(8비트)인 일종의 리스트/

### 엄격한 바이트스트링과 느긋한 바이트스트링
* 엄격한 바이트스트링: (Data.ByteString) - 느긋한 처리 X - 무한 처리 불가
* 느긋한 바이트스트링: (Data.ByteString.Lazy) - 느긋하지만 썽크(64KB)로 처리하기 때문에 리스트만큼 느긋하지 않다.

### 바이트스트링으로 파일 복사하기
```
import System.Environment
import System.Directory
import System.IO
import Control.Exception
import qualified Data.ByteString.Lazy as B

main = do
	(fileName1:fileName2:_) <- getArgs
	copy fileName1 fileName2

copy source destroy = do
	contents <- B.readFile source
	bracketOnError
		(openTempFile “.” “temp”)
		(\(tempName, tempHandle) -> do
			hClose tempHandle
			removeFile tempName)
		(\(tempName, tempHandle) -> do
			hClose tempHandle
			renameFile tempName dest)
```
---

	
