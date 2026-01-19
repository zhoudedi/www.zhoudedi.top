async function loadResortName() {
  try {
    // 1. 替换为新的API地址，删除fetch不支持的dataType参数（fetch默认处理JSON，无需额外配置）
    const response = await fetch('https://api.vore.top/api/IPdata', {
      headers: {
        'Accept': 'application/json' // 显式声明接收JSON格式，提升兼容性
      }
    });

    // 2. 校验API响应是否成功（避免404/500等错误）
    if (!response.ok) {
      throw new Error(`API请求失败，状态码: ${response.status}`);
    }

    // 3. 解析响应数据（新API返回结构与旧API不同，需按新结构取值）
    const ipData = await response.json();
    console.log("IP查询结果:", ipData);
    console.log("在id=ip的标签输出IP与地址、id=ipwz的标签输出IP位置");

    // 4. 从新API结构中提取关键信息：
    // - IP地址：ipinfo.text
    // - IP位置：拼接 省+市+区县（处理info3可能为空的情况）
    const ipAddress = ipData.ipinfo.text;
    const ipLocation = `${ipData.ipdata.info1}${ipData.ipdata.info2}${ipData.ipdata.info3 ? ipData.ipdata.info3 : ''}`;
    const ispInfo = ipData.ipdata.isp; // 可选：获取运营商信息

    // 5. 渲染到页面标签（补充运营商信息，让显示更完整）
    document.getElementById('ip').innerHTML = `${ipAddress}`;
    document.getElementById('ipwz').innerHTML = `${ipLocation}`;

  } catch (error) {
    // 6. 错误处理（避免页面无响应，方便调试）
    console.error("加载IP信息失败:", error);
    document.getElementById('ip').innerHTML = "IP信息加载失败";
    document.getElementById('ipwz').innerHTML = "位置信息加载失败";
  }
}
// 执行函数
loadResortName();
/*使用：
1、导入js文件    <script src='./ip.js'></script>
2、在html添加对应ID  您的IP：<span id="ip">加载中...</span>所在位置：<span id="ipwz">加载中...</span>

*/
