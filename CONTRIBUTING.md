# Contributing to number2english_word

Thank you for your interest in contributing to number2english_word! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/number2word.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites
- Node.js >= 12.0.0
- npm

### Install Dependencies
```bash
npm install
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for all public functions
- Keep functions small and focused on a single task
- Write self-documenting code

## Testing

- Write tests for all new features
- Ensure all tests pass before submitting a PR
- Aim for at least 80% code coverage
- Test edge cases and error conditions

### Test Structure
```javascript
describe('Feature Name', () => {
    test('should do something specific', () => {
        expect(yourFunction(input)).toBe(expectedOutput);
    });
});
```

## Commit Messages

Follow the conventional commits specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

Example:
```
feat: add support for Roman numerals
fix: handle edge case with zero values
docs: update API documentation
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG.md with your changes
3. Add tests for new functionality
4. Ensure all tests pass
5. Update TypeScript definitions if needed
6. Request review from maintainers

### PR Title Format
Use the same format as commit messages:
```
feat: add Roman numeral conversion
fix: correct handling of negative decimals
```

## Feature Requests

- Check existing issues first
- Clearly describe the feature and its use case
- Provide examples of how it would be used
- Be open to discussion and feedback

## Bug Reports

When filing a bug report, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Code Sample**: Minimal code to reproduce the issue
6. **Environment**: Node.js version, OS, etc.

Example:
```javascript
// Bug: Incorrect conversion for number 1000
const result = number2word(1000);
// Expected: "One Thousand"
// Actual: "Thousand"
```

## Development Guidelines

### Adding New Features

1. Discuss the feature in an issue first
2. Write tests before implementing (TDD approach)
3. Implement the feature
4. Update documentation
5. Add examples to README and examples.js

### Adding Language Support

If you want to add support for other languages:

1. Create a new file (e.g., `languages/spanish.js`)
2. Follow the same API structure
3. Add comprehensive tests
4. Update the main export to support language options
5. Document the new language in README

### Performance Considerations

- Avoid unnecessary loops and recursion
- Cache repeated calculations when possible
- Test with large numbers
- Profile performance-critical code

## Code Review Process

All submissions require review. We use GitHub pull requests for this purpose.

Reviewers will check for:
- Code quality and style
- Test coverage
- Documentation completeness
- Breaking changes
- Performance impact

## Questions?

Feel free to open an issue for:
- Questions about contributing
- Clarification on requirements
- Discussion of potential features

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- CHANGELOG for significant contributions
- README acknowledgments section (for major features)

Thank you for contributing! 🎉
