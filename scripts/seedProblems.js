// Seed 3 copy/paste-friendly problems into Problem Admin Service.
// Usage: node scripts/seedProblems.js

import http from "node:http";

const BASE_URL = "http://localhost:3000";

function requestJson(method, path, body) {
  const url = new URL(path, BASE_URL);
  const payload = body ? JSON.stringify(body) : "";

  return new Promise((resolve, reject) => {
    const req = http.request(
      url,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          const status = res.statusCode ?? 0;
          let json;
          try {
            json = data ? JSON.parse(data) : null;
          } catch {
            json = { raw: data };
          }
          if (status >= 200 && status < 300) resolve(json);
          else reject({ status, json });
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

const problems = [
  {
    title: "Climbing Stairs",
    difficulty: "easy",
    description: `## Climbing Stairs (DP)

You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb **1** or **2** steps. Return the number of distinct ways to climb to the top.

### Input
A single integer \`n\`.

### Output
Print the number of ways.

### Example
Input:
\`\`\`
5
\`\`\`
Output:
\`\`\`
8
\`\`\`

---

## Copy/Paste Solutions

### Python (language=Python)
\`\`\`python
def solve(n: int) -> int:
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b
\`\`\`

### Java (language=Java)
\`\`\`java
static int solve(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
\`\`\`

### C++ (language=C++)
\`\`\`cpp
static int solve(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
\`\`\`
`,
    testCases: [
      { input: "5\n", output: "8\n" }
    ],
    codeStubs: [
      {
        language: "PYTHON",
        startSnippet: "import sys\n\n",
        userSnippet: `def solve(n: int) -> int:
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b
`,
        endSnippet: `

def main():
    data = sys.stdin.read().strip().split()
    n = int(data[0]) if data else 0
    print(solve(n))

if __name__ == '__main__':
    main()
`,
      },
      {
        language: "JAVA",
        startSnippet: "import java.util.*;\n\npublic class Main {\n",
        userSnippet: `static int solve(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
`,
        endSnippet: `
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.hasNextInt() ? sc.nextInt() : 0;
    System.out.println(solve(n));
  }
}
`,
      },
      {
        language: "CPP",
        startSnippet: "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        userSnippet: `static int solve(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
`,
        endSnippet: `

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  if(!(cin >> n)) return 0;
  cout << solve(n) << "\\n";
  return 0;
}
`,
      },
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    description: `## Longest Substring Without Repeating Characters (Sliding Window)

Given a string \`s\`, find the length of the longest substring without repeating characters.

### Input
A single line string \`s\`.

### Output
Print the maximum length.

### Example
Input:
\`\`\`
abcabcbb
\`\`\`
Output:
\`\`\`
3
\`\`\`

---

## Copy/Paste Solutions

### Python (language=Python)
\`\`\`python
def solve(s: str) -> int:
    last = {}
    left = 0
    ans = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        ans = max(ans, right - left + 1)
    return ans
\`\`\`

### Java (language=Java)
\`\`\`java
static int solve(String s) {
    int[] last = new int[256];
    Arrays.fill(last, -1);
    int left = 0, ans = 0;
    for (int right = 0; right < s.length(); right++) {
        int c = (int)s.charAt(right);
        if (last[c] >= left) left = last[c] + 1;
        last[c] = right;
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}
\`\`\`

### C++ (language=C++)
\`\`\`cpp
static int solve(const string& s) {
    vector<int> last(256, -1);
    int left = 0, ans = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        unsigned char c = (unsigned char)s[right];
        if (last[c] >= left) left = last[c] + 1;
        last[c] = right;
        ans = max(ans, right - left + 1);
    }
    return ans;
}
\`\`\`
`,
    testCases: [
      { input: "abcabcbb\n", output: "3\n" },
    ],
    codeStubs: [
      {
        language: "PYTHON",
        startSnippet: "import sys\n\n",
        userSnippet: `def solve(s: str) -> int:
    last = {}
    left = 0
    ans = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        ans = max(ans, right - left + 1)
    return ans
`,
        endSnippet: `

def main():
    lines = sys.stdin.read().splitlines()
    s = lines[0] if lines else ""
    print(solve(s))

if __name__ == '__main__':
    main()
`,
      },
      {
        language: "JAVA",
        startSnippet: "import java.util.*;\n\npublic class Main {\n",
        userSnippet: `static int solve(String s) {
    int[] last = new int[256];
    Arrays.fill(last, -1);
    int left = 0, ans = 0;
    for (int right = 0; right < s.length(); right++) {
        int c = (int)s.charAt(right);
        if (last[c] >= left) left = last[c] + 1;
        last[c] = right;
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}
`,
        endSnippet: `
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String s = sc.hasNextLine() ? sc.nextLine() : "";
    System.out.println(solve(s));
  }
}
`,
      },
      {
        language: "CPP",
        startSnippet: "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        userSnippet: `static int solve(const string& s) {
    vector<int> last(256, -1);
    int left = 0, ans = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        unsigned char c = (unsigned char)s[right];
        if (last[c] >= left) left = last[c] + 1;
        last[c] = right;
        ans = max(ans, right - left + 1);
    }
    return ans;
}
`,
        endSnippet: `

int main(){
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  string s;
  if(!getline(cin, s)) return 0;
  cout << solve(s) << "\\n";
  return 0;
}
`,
      },
    ],
  },
  {
    title: "Number of Islands",
    difficulty: "hard",
    description: `## Number of Islands (Graph BFS/DFS)

You are given an \`m x n\` grid of characters where \`'1'\` represents land and \`'0'\` represents water.
Return the number of islands.

An island is formed by connecting adjacent lands **horizontally or vertically**.

### Input
First line: \`m n\`
Next \`m\` lines: a string of length \`n\` consisting of \`0\` and \`1\`

### Output
Print the number of islands.

### Example
Input:
\`\`\`
4 5
11000
11000
00100
00011
\`\`\`
Output:
\`\`\`
3
\`\`\`

---

## Copy/Paste Solutions

### Python (language=Python)
\`\`\`python
from collections import deque

def solve(grid):
    m = len(grid)
    n = len(grid[0]) if m else 0
    seen = [[False]*n for _ in range(m)]
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    ans = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1' and not seen[i][j]:
                ans += 1
                q = deque([(i,j)])
                seen[i][j] = True
                while q:
                    x,y = q.popleft()
                    for dx,dy in dirs:
                        nx,ny = x+dx, y+dy
                        if 0<=nx<m and 0<=ny<n and grid[nx][ny]=='1' and not seen[nx][ny]:
                            seen[nx][ny] = True
                            q.append((nx,ny))
    return ans
\`\`\`

### Java (language=Java)
\`\`\`java
static int solve(char[][] g) {
    int m = g.length, n = g[0].length;
    boolean[][] seen = new boolean[m][n];
    int ans = 0;
    int[] dx = {1,-1,0,0};
    int[] dy = {0,0,1,-1};
    ArrayDeque<int[]> q = new ArrayDeque<>();
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] == '1' && !seen[i][j]) {
                ans++;
                seen[i][j] = true;
                q.add(new int[]{i,j});
                while(!q.isEmpty()) {
                    int[] cur = q.poll();
                    for (int k = 0; k < 4; k++) {
                        int ni = cur[0] + dx[k], nj = cur[1] + dy[k];
                        if (0<=ni && ni<m && 0<=nj && nj<n && g[ni][nj]=='1' && !seen[ni][nj]) {
                            seen[ni][nj] = true;
                            q.add(new int[]{ni,nj});
                        }
                    }
                }
            }
        }
    }
    return ans;
}
\`\`\`

### C++ (language=C++)
\`\`\`cpp
static int solve(vector<string>& g) {
    int m = (int)g.size();
    int n = m ? (int)g[0].size() : 0;
    vector<vector<int>> seen(m, vector<int>(n, 0));
    int ans = 0;
    int dx[4] = {1,-1,0,0};
    int dy[4] = {0,0,1,-1};
    queue<pair<int,int>> q;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j]=='1' && !seen[i][j]) {
                ans++;
                seen[i][j] = 1;
                q.push({i,j});
                while(!q.empty()) {
                    auto [x,y] = q.front(); q.pop();
                    for (int k = 0; k < 4; k++) {
                        int nx = x + dx[k], ny = y + dy[k];
                        if (0<=nx && nx<m && 0<=ny && ny<n && g[nx][ny]=='1' && !seen[nx][ny]) {
                            seen[nx][ny] = 1;
                            q.push({nx,ny});
                        }
                    }
                }
            }
        }
    }
    return ans;
}
\`\`\`
`,
    testCases: [
      { input: "4 5\n11000\n11000\n00100\n00011\n", output: "3\n" }
    ],
    codeStubs: [
      {
        language: "PYTHON",
        startSnippet: "import sys\nfrom collections import deque\n\n",
        userSnippet: `from collections import deque

def solve(grid):
    m = len(grid)
    n = len(grid[0]) if m else 0
    seen = [[False]*n for _ in range(m)]
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    ans = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1' and not seen[i][j]:
                ans += 1
                q = deque([(i,j)])
                seen[i][j] = True
                while q:
                    x,y = q.popleft()
                    for dx,dy in dirs:
                        nx,ny = x+dx, y+dy
                        if 0<=nx<m and 0<=ny<n and grid[nx][ny]=='1' and not seen[nx][ny]:
                            seen[nx][ny] = True
                            q.append((nx,ny))
    return ans
`,
        endSnippet: `

def main():
    data = sys.stdin.read().splitlines()
    if not data:
        return
    m, n = map(int, data[0].split())
    grid = [list(data[i+1].strip()) for i in range(m)]
    print(solve(grid))

if __name__ == '__main__':
    main()
`,
      },
      {
        language: "JAVA",
        startSnippet: "import java.util.*;\n\npublic class Main {\n",
        userSnippet: `static int solve(char[][] g) {
    int m = g.length, n = g[0].length;
    boolean[][] seen = new boolean[m][n];
    int ans = 0;
    int[] dx = {1,-1,0,0};
    int[] dy = {0,0,1,-1};
    ArrayDeque<int[]> q = new ArrayDeque<>();
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j] == '1' && !seen[i][j]) {
                ans++;
                seen[i][j] = true;
                q.add(new int[]{i,j});
                while(!q.isEmpty()) {
                    int[] cur = q.poll();
                    for (int k = 0; k < 4; k++) {
                        int ni = cur[0] + dx[k], nj = cur[1] + dy[k];
                        if (0<=ni && ni<m && 0<=nj && nj<n && g[ni][nj]=='1' && !seen[ni][nj]) {
                            seen[ni][nj] = true;
                            q.add(new int[]{ni,nj});
                        }
                    }
                }
            }
        }
    }
    return ans;
}
`,
        endSnippet: `
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int m = sc.nextInt();
    int n = sc.nextInt();
    char[][] g = new char[m][n];
    for(int i=0;i<m;i++){
      String line = sc.next();
      g[i] = line.toCharArray();
    }
    System.out.println(solve(g));
  }
}
`,
      },
      {
        language: "CPP",
        startSnippet: "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        userSnippet: `static int solve(vector<string>& g) {
    int m = (int)g.size();
    int n = m ? (int)g[0].size() : 0;
    vector<vector<int>> seen(m, vector<int>(n, 0));
    int ans = 0;
    int dx[4] = {1,-1,0,0};
    int dy[4] = {0,0,1,-1};
    queue<pair<int,int>> q;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (g[i][j]=='1' && !seen[i][j]) {
                ans++;
                seen[i][j] = 1;
                q.push({i,j});
                while(!q.empty()) {
                    auto [x,y] = q.front(); q.pop();
                    for (int k = 0; k < 4; k++) {
                        int nx = x + dx[k], ny = y + dy[k];
                        if (0<=nx && nx<m && 0<=ny && ny<n && g[nx][ny]=='1' && !seen[nx][ny]) {
                            seen[nx][ny] = 1;
                            q.push({nx,ny});
                        }
                    }
                }
            }
        }
    }
    return ans;
}
`,
        endSnippet: `

int main(){
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int m,n;
  if(!(cin>>m>>n)) return 0;
  vector<string> g(m);
  for(int i=0;i<m;i++) cin>>g[i];
  cout<<solve(g)<<"\\n";
  return 0;
}
`,
      },
    ],
  },
  {
    title: "Binary Search",
    difficulty: "easy",
    description: `## Binary Search (Arrays)

Given a sorted array of integers and a target value, return the **index** if the target is found. Otherwise return \`-1\`.

### Input
First line: integer \`n\`  
Second line: \`n\` sorted integers  
Third line: integer \`target\`

### Output
Print the index (0-based) or \`-1\`.

### Example
Input:
\`\`\`
5
1 3 5 7 9
7
\`\`\`
Output:
\`\`\`
3
\`\`\`

---

## Copy/Paste Solutions

### Python
\`\`\`python
def solve(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
\`\`\`

### Java
\`\`\`java
static int solve(int[] a, int target) {
  int lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    int mid = (lo + hi) >>> 1;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
\`\`\`

### C++
\`\`\`cpp
static int solve(vector<int>& a, int target) {
  int lo = 0, hi = (int)a.size() - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
\`\`\`
`,
    testCases: [
      { input: "5\n1 3 5 7 9\n7\n", output: "3\n" }
    ],
    codeStubs: [
      {
        language: "PYTHON",
        startSnippet: "import sys\n\n",
        userSnippet: `def solve(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`,
        endSnippet: `

def main():
    data = sys.stdin.read().strip().split()
    if not data:
        return
    n = int(data[0])
    nums = list(map(int, data[1:1+n]))
    target = int(data[1+n])
    print(solve(nums, target))

if __name__ == '__main__':
    main()
`,
      },
      {
        language: "JAVA",
        startSnippet: "import java.util.*;\n\npublic class Main {\n",
        userSnippet: `static int solve(int[] a, int target) {
  int lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    int mid = (lo + hi) >>> 1;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
`,
        endSnippet: `
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.hasNextInt() ? sc.nextInt() : 0;
    int[] a = new int[n];
    for (int i = 0; i < n; i++) a[i] = sc.nextInt();
    int target = sc.nextInt();
    System.out.println(solve(a, target));
  }
}
`,
      },
      {
        language: "CPP",
        startSnippet: "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        userSnippet: `static int solve(vector<int>& a, int target) {
  int lo = 0, hi = (int)a.size() - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
`,
        endSnippet: `

int main(){
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  if(!(cin>>n)) return 0;
  vector<int> a(n);
  for(int i=0;i<n;i++) cin>>a[i];
  int target; cin>>target;
  cout<<solve(a,target)<<"\\n";
  return 0;
}
`,
      }
    ]
  },

  {
    title: "Valid Parentheses",
    difficulty: "easy",
    description: `## Valid Parentheses (Stack)

Given a string \`s\` containing just the characters \`()[]{}\`, determine if the input string is valid.

An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.

### Input
One line string \`s\`.

### Output
Print \`true\` if valid, otherwise \`false\`.

### Example
Input:
\`\`\`
([{}])
\`\`\`
Output:
\`\`\`
true
\`\`\`

---

## Copy/Paste Solutions

### Python
\`\`\`python
def solve(s: str) -> str:
    st = []
    mp = {')':'(',']':'[','}':'{'}
    for ch in s.strip():
        if ch in '([{':
            st.append(ch)
        else:
            if not st or st[-1] != mp.get(ch):
                return 'false'
            st.pop()
    return 'true' if not st else 'false'
\`\`\`
`,
    testCases: [
      { input: "([{}])\n", output: "true\n" }
    ],
    codeStubs: [
      {
        language: "PYTHON",
        startSnippet: "import sys\n\n",
        userSnippet: `def solve(s: str) -> str:
    st = []
    mp = {')':'(',']':'[','}':'{'}
    for ch in s.strip():
        if ch in '([{':
            st.append(ch)
        else:
            if not st or st[-1] != mp.get(ch):
                return 'false'
            st.pop()
    return 'true' if not st else 'false'
`,
        endSnippet: `

def main():
  lines = sys.stdin.read().splitlines()
  s = lines[0] if lines else ""
  print(solve(s))

if __name__ == '__main__':
  main()
`,
      }
    ]
  },

  {
    title: "Coin Change",
    difficulty: "medium",
    description: `## Coin Change (DP)

Given an integer array \`coins\` representing coins of different denominations and an integer \`amount\`, return the fewest number of coins that you need to make up that amount. If the amount cannot be made up, return \`-1\`.

### Input
First line: integer \`n\`  
Second line: \`n\` integers (coins)  
Third line: integer \`amount\`

### Output
Print the minimum number of coins.

### Example
Input:
\`\`\`
3
1 2 5
11
\`\`\`
Output:
\`\`\`
3
\`\`\`

---

## Copy/Paste Solutions

### Python
\`\`\`python
def solve(coins, amount):
    INF = 10**9
    dp = [INF]*(amount+1)
    dp[0] = 0
    for a in range(1, amount+1):
        for c in coins:
            if a-c >= 0:
                dp[a] = min(dp[a], dp[a-c] + 1)
    return dp[amount] if dp[amount] < INF else -1
\`\`\`
`,
    testCases: [
      { input: "3\n1 2 5\n11\n", output: "3\n" }
    ],
    codeStubs: [
      {
        language: "PYTHON",
        startSnippet: "import sys\n\n",
        userSnippet: `def solve(coins, amount):
    INF = 10**9
    dp = [INF]*(amount+1)
    dp[0] = 0
    for a in range(1, amount+1):
        for c in coins:
            if a-c >= 0:
                dp[a] = min(dp[a], dp[a-c] + 1)
    return dp[amount] if dp[amount] < INF else -1
`,
        endSnippet: `

def main():
    data = sys.stdin.read().strip().split()
    if not data:
        return
    n = int(data[0])
    coins = list(map(int, data[1:1+n]))
    amount = int(data[1+n])
    print(solve(coins, amount))

if __name__ == '__main__':
    main()
`,
      }
    ]
  }
  ,
  {
    title: "Longest Increasing Subsequence",
    difficulty: "medium",
    description: `## Longest Increasing Subsequence (DP)

Given an array of integers, return the length of the **longest strictly increasing subsequence**.

### Input
First line: integer \\(n\\)  
Second line: \\(n\\) integers

### Output
Print the LIS length.

### Testcase (Copy/Paste)
Input:
\`\`\`
8
10 9 2 5 3 7 101 18
\`\`\`
Expected Output:
\`\`\`
4
\`\`\`

---

## Copy/Paste Solutions

### Python
\`\`\`python
def solve(a):
    # O(n log n) patience sorting
    import bisect
    tails = []
    for x in a:
        i = bisect.bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)
\`\`\`

### Java
\`\`\`java
static int solve(int[] a) {
  int[] tails = new int[a.length];
  int size = 0;
  for (int x : a) {
    int lo = 0, hi = size;
    while (lo < hi) {
      int mid = (lo + hi) >>> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
    if (lo == size) size++;
  }
  return size;
}
\`\`\`

### C++
\`\`\`cpp
static int solve(vector<int>& a) {
  vector<int> tails;
  for (int x : a) {
    auto it = lower_bound(tails.begin(), tails.end(), x);
    if (it == tails.end()) tails.push_back(x);
    else *it = x;
  }
  return (int)tails.size();
}
\`\`\`
`,
    editorial: `## Editorial

This is a classic LIS problem.

### Approach (Patience Sorting)
- Maintain an array \\(tails\\) where \\(tails[k]\\) is the minimum possible tail value of an increasing subsequence of length \\(k+1\\).\n+- For each value \\(x\\), binary search the first position in \\(tails\\) that is \\(\\ge x\\) and replace it.\n+- The size of \\(tails\\) at the end is the LIS length.\n+\n**Time:** \\(O(n \\log n)\\)  \n**Space:** \\(O(n)\\)\n`,
    testCases: [{ input: "8\n10 9 2 5 3 7 101 18\n", output: "4\n" }],
    codeStubs: [
      {
        language: "PYTHON",
        startSnippet: "import sys\n\n",
        userSnippet: `def solve(a):
    import bisect
    tails = []
    for x in a:
        i = bisect.bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)
`,
        endSnippet: `

def main():
    data = sys.stdin.read().strip().split()
    if not data:
        return
    n = int(data[0])
    a = list(map(int, data[1:1+n]))
    print(solve(a))

if __name__ == '__main__':
    main()
`,
      },
      {
        language: "JAVA",
        startSnippet: "import java.util.*;\n\npublic class Main {\n",
        userSnippet: `static int solve(int[] a) {
  int[] tails = new int[a.length];
  int size = 0;
  for (int x : a) {
    int lo = 0, hi = size;
    while (lo < hi) {
      int mid = (lo + hi) >>> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
    if (lo == size) size++;
  }
  return size;
}
`,
        endSnippet: `
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.hasNextInt() ? sc.nextInt() : 0;
    int[] a = new int[n];
    for (int i = 0; i < n; i++) a[i] = sc.nextInt();
    System.out.println(solve(a));
  }
}
`,
      },
      {
        language: "CPP",
        startSnippet: "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        userSnippet: `static int solve(vector<int>& a) {
  vector<int> tails;
  for (int x : a) {
    auto it = lower_bound(tails.begin(), tails.end(), x);
    if (it == tails.end()) tails.push_back(x);
    else *it = x;
  }
  return (int)tails.size();
}
`,
        endSnippet: `

int main(){
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  if(!(cin>>n)) return 0;
  vector<int> a(n);
  for(int i=0;i<n;i++) cin>>a[i];
  cout<<solve(a)<<"\\n";
  return 0;
}
`,
      }
    ]
  },

  {
    title: "Trapping Rain Water",
    difficulty: "hard",
    description: `## Trapping Rain Water (Two Pointers)

Given \\(n\\) non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Input
First line: integer \\(n\\)  \nSecond line: \\(n\\) integers (heights)

### Output
Print total trapped water.

### Testcase (Copy/Paste)
Input:
\`\`\`
12
0 1 0 2 1 0 1 3 2 1 2 1
\`\`\`
Expected Output:
\`\`\`
6
\`\`\`

---

## Copy/Paste Solutions

### Python
\`\`\`python
def solve(h):
    l, r = 0, len(h) - 1
    lm = rm = 0
    ans = 0
    while l < r:
        if h[l] <= h[r]:
            lm = max(lm, h[l])
            ans += lm - h[l]
            l += 1
        else:
            rm = max(rm, h[r])
            ans += rm - h[r]
            r -= 1
    return ans
\`\`\`
`,
    editorial: `## Editorial

### Two pointers
Keep two pointers \\(l\\) and \\(r\\) with running maximums \\(lm\\) and \\(rm\\).\n\nAt each step, move the side with the smaller height (because that side’s max bounds the water level).\n\n**Time:** \\(O(n)\\)  \n**Space:** \\(O(1)\\)\n`,
    testCases: [{ input: "12\n0 1 0 2 1 0 1 3 2 1 2 1\n", output: "6\n" }],
    codeStubs: [
      {
        language: "PYTHON",
        startSnippet: "import sys\n\n",
        userSnippet: `def solve(h):
    l, r = 0, len(h) - 1
    lm = rm = 0
    ans = 0
    while l < r:
        if h[l] <= h[r]:
            lm = max(lm, h[l])
            ans += lm - h[l]
            l += 1
        else:
            rm = max(rm, h[r])
            ans += rm - h[r]
            r -= 1
    return ans
`,
        endSnippet: `

def main():
    data = sys.stdin.read().strip().split()
    if not data:
        return
    n = int(data[0])
    h = list(map(int, data[1:1+n]))
    print(solve(h))

if __name__ == '__main__':
    main()
`,
      },
      {
        language: "JAVA",
        startSnippet: "import java.util.*;\n\npublic class Main {\n",
        userSnippet: `static int solve(int[] h) {
  int l = 0, r = h.length - 1;
  int lm = 0, rm = 0, ans = 0;
  while (l < r) {
    if (h[l] <= h[r]) {
      lm = Math.max(lm, h[l]);
      ans += lm - h[l];
      l++;
    } else {
      rm = Math.max(rm, h[r]);
      ans += rm - h[r];
      r--;
    }
  }
  return ans;
}
`,
        endSnippet: `
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.hasNextInt() ? sc.nextInt() : 0;
    int[] h = new int[n];
    for (int i = 0; i < n; i++) h[i] = sc.nextInt();
    System.out.println(solve(h));
  }
}
`,
      },
      {
        language: "CPP",
        startSnippet: "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        userSnippet: `static int solve(vector<int>& h) {
  int l = 0, r = (int)h.size() - 1;
  int lm = 0, rm = 0, ans = 0;
  while (l < r) {
    if (h[l] <= h[r]) {
      lm = max(lm, h[l]);
      ans += lm - h[l];
      l++;
    } else {
      rm = max(rm, h[r]);
      ans += rm - h[r];
      r--;
    }
  }
  return ans;
}
`,
        endSnippet: `

int main(){
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  if(!(cin>>n)) return 0;
  vector<int> h(n);
  for(int i=0;i<n;i++) cin>>h[i];
  cout<<solve(h)<<"\\n";
  return 0;
}
`,
      }
    ]
  }
];

async function main() {
  // Replace seeded problems to avoid stale/broken versions in DB.
  const seedTitles = new Set(problems.map((p) => p.title));
  try {
    const existing = await requestJson("GET", "/api/v1/problems");
    const list = Array.isArray(existing?.data) ? existing.data : [];
    for (const item of list) {
      if (item?._id && seedTitles.has(item?.title)) {
        await requestJson("DELETE", `/api/v1/problems/${item._id}`);
        console.log("Deleted existing:", item._id, "-", item.title);
      }
    }
  } catch (e) {
    console.warn("Could not clean existing seeded problems. Continuing inserts.", e);
  }

  for (const p of problems) {
    try {
      const resp = await requestJson("POST", "/api/v1/problems", p);
      console.log("Inserted:", resp?.data?._id, "-", p.title);
    } catch (e) {
      console.error("Failed:", p.title, e);
      process.exitCode = 1;
    }
  }
}

main();

