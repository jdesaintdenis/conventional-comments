# Conventional Comments (Security-Focused Fork)

<p align="center">
  <img src="icons/icon128.png" alt="Conventional Comments Logo" width="128" height="128">
</p>

> A browser extension that enhances code reviews by implementing the Conventional Comments standard directly in GitHub and GitLab interfaces.

<p align="center">
  <img src="media/demo.gif" alt="Conventional Comments Demo">
</p>

## 🎯 The Problem

Pullco created an awesome browser extension, but some companies policies might not allow for it to be used.

This Fork aims to fix that.

## 💡 The Solution

This fork is a more secure way of using the awesome feature that Pullco designed with their Conventional Comments implementation for GitHub and GitLab.

Simply fork it again into your organization's repositories, change the `homepage_url` inside `manifest-base.json` to your new repo, and you're good to go!

## ✨ Features

- 🔐 **No external API calls** - All assets moved inside the repo and all external API calls were removed
- 💯 **All original features available** - Or almost all of them
  - 🎨 **Intuitive Toolbar**: Seamlessly integrated into GitHub and GitLab interfaces
  - 🏷️ **Standard Labels**: 
    - `praise`: Highlight something positive
    - `nitpick`: Minor, non-blocking issues
    - `suggestion`: Suggest specific improvements
    - `issue`: Point out blocking problems
    - `question`: Ask for clarification
    - `thought`: Share a reflection or idea
    - `chore`: Request minor, non-code tasks
  - 🎯 **Decorations**:
    - `(non-blocking)`: Optional changes
    - `(blocking)`: Must be addressed
    - `(if-minor)`: Address if the effort is small
  - 🔄 **Toggle Functionality**: Easily remove labels or decorations
  - 🎨 **Badge Style Option**: Switch between text and visual badge formats
  - 🌓 **Dark Mode Support**: Seamlessly works with both GitHub and GitLab themes
  - 🧩 ~~**Slack Threads**: Integrated with Pullpo's PR-Channels add-on for direct Slack thread links~~ **Removed for security reasons**

## 🚀 Usage

1. Navigate to any pull request or merge request on GitHub or GitLab
2. Click on the comment box
3. Use the toolbar that appears above the comment box:
   - Select a label type (e.g., "suggestion", "issue")
   - Optionally add a decoration
   - Write your comment
4. Your comment will be automatically formatted according to the Conventional Comments standard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🛠️ Building from Source

The extension can be built for both Chrome and Firefox using our build system:

1. Fork this repository inside your own organization
2. Update `homepage_url` in `manifest-base.json` to point to your fork -> _this is required to prevent the use of assets outside your organization_
3. Clone your fork and install dependencies:
   ```bash
   git clone https://github.com/<your-user-or-org>/conventional-comments.git
   cd conventional-comments
   npm install
   ```

4. Build for your target browser:
   - For Chrome:
     ```bash
     npm run build:chrome
     ```
   - For Firefox:
     ```bash
     npm run build:firefox
     ```
   - For both browsers:
     ```bash
     npm run build
     ```

      > [!NOTE]
      > Append ` -- prod` to a build command to generate a minified bundle.

5. Load the extension:
   - Chrome: Load the `build/chrome` directory as an unpacked extension
   - Firefox: Load the `build/firefox` directory as a temporary add-on

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original project: https://github.com/pullpo-io/conventional-comments
