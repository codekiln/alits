#!/bin/bash

# Setup script for Ableton Live Git configuration
# This script configures Git filters to handle Ableton file types properly

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to configure Git filters
configure_git_filters() {
    local scope="$1"
    local scope_flag=""
    
    if [ "$scope" = "global" ]; then
        scope_flag="--global"
        print_status "Configuring global Git filters for Ableton files..."
    else
        print_status "Configuring project-specific Git filters for Ableton files..."
    fi
    
    # Gzip filter for XML-based Ableton files (.als, .alc, .adg, .adv)
    print_status "Setting up gzip filter for XML-based files..."
    git config $scope_flag filter.gzip.clean 'gzip -cn'
    git config $scope_flag filter.gzip.smudge 'gzip -cd'
    git config $scope_flag filter.gzip.required true
    git config $scope_flag diff.gzip.textconv 'gzip -cd'
    
    # Filter for Max for Live devices (.amxd)
    print_status "Setting up amxd-strip filter for Max for Live devices..."
    git config $scope_flag filter.amxd-strip.clean 'awk "(NR>1)"'
    git config $scope_flag filter.amxd-strip.smudge 'cat'
    git config $scope_flag filter.amxd-strip.required true
    git config $scope_flag diff.amxd-strip.textconv 'awk "(NR>1)"'
    
    print_success "Git filters configured successfully!"
}

# Function to verify configuration
verify_configuration() {
    print_status "Verifying Git filter configuration..."
    
    # Check gzip filter
    if git config --get filter.gzip.clean >/dev/null 2>&1; then
        print_success "Gzip filter is configured"
    else
        print_error "Gzip filter is not configured"
        return 1
    fi
    
    # Check amxd-strip filter
    if git config --get filter.amxd-strip.clean >/dev/null 2>&1; then
        print_success "AMXD-strip filter is configured"
    else
        print_error "AMXD-strip filter is not configured"
        return 1
    fi
    
    print_success "All Git filters are properly configured!"
}

# Function to show current configuration
show_configuration() {
    print_status "Current Git filter configuration:"
    echo
    echo "Gzip filter:"
    git config --get filter.gzip.clean 2>/dev/null || echo "  Not configured"
    git config --get filter.gzip.smudge 2>/dev/null || echo "  Not configured"
    echo
    echo "AMXD-strip filter:"
    git config --get filter.amxd-strip.clean 2>/dev/null || echo "  Not configured"
    git config --get filter.amxd-strip.smudge 2>/dev/null || echo "  Not configured"
    echo
}

# Function to test the configuration
test_configuration() {
    print_status "Testing Git filter configuration..."
    
    # Create a temporary test file
    local test_file="test-ableton-git.als"
    echo '<?xml version="1.0" encoding="UTF-8"?><Ableton><LiveSet></LiveSet></Ableton>' > "$test_file"
    
    # Add to Git
    git add "$test_file" 2>/dev/null || {
        print_warning "Could not add test file to Git (not in a Git repository?)"
        rm -f "$test_file"
        return 0
    }
    
    # Check if it was processed correctly
    if git ls-files --stage "$test_file" | grep -q "filter=gzip"; then
        print_success "Test file was processed by gzip filter"
    else
        print_warning "Test file was not processed by gzip filter"
    fi
    
    # Clean up
    git reset HEAD "$test_file" 2>/dev/null || true
    rm -f "$test_file"
    
    print_success "Configuration test completed!"
}

# Main script logic
main() {
    echo "=========================================="
    echo "  Ableton Live Git Configuration Setup"
    echo "=========================================="
    echo
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    
    if ! command_exists git; then
        print_error "Git is not installed or not in PATH"
        exit 1
    fi
    
    if ! command_exists gzip; then
        print_error "gzip is not installed or not in PATH"
        exit 1
    fi
    
    if ! command_exists awk; then
        print_error "awk is not installed or not in PATH"
        exit 1
    fi
    
    print_success "All prerequisites are available"
    echo
    
    # Parse command line arguments
    local scope="local"
    local show_config=false
    local test_config=false
    local verify_only=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --global)
                scope="global"
                shift
                ;;
            --show)
                show_config=true
                shift
                ;;
            --test)
                test_config=true
                shift
                ;;
            --verify)
                verify_only=true
                shift
                ;;
            --help|-h)
                echo "Usage: $0 [OPTIONS]"
                echo
                echo "Options:"
                echo "  --global    Configure filters globally (for all repositories)"
                echo "  --show      Show current configuration"
                echo "  --test      Test the configuration with a sample file"
                echo "  --verify    Only verify existing configuration"
                echo "  --help      Show this help message"
                echo
                echo "Examples:"
                echo "  $0                    # Configure for current repository only"
                echo "  $0 --global          # Configure for all repositories"
                echo "  $0 --show            # Show current configuration"
                echo "  $0 --test            # Test the configuration"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    # Show current configuration if requested
    if [ "$show_config" = true ]; then
        show_configuration
        exit 0
    fi
    
    # Verify only if requested
    if [ "$verify_only" = true ]; then
        verify_configuration
        exit $?
    fi
    
    # Configure Git filters
    configure_git_filters "$scope"
    echo
    
    # Verify configuration
    if verify_configuration; then
        echo
        print_success "Setup completed successfully!"
        
        if [ "$scope" = "global" ]; then
            print_status "Filters are now configured globally for all Git repositories"
        else
            print_status "Filters are now configured for this repository only"
        fi
        
        echo
        print_status "Next steps:"
        echo "  1. Make sure your .gitattributes file is in the project root"
        echo "  2. Test with: $0 --test"
        echo "  3. See INSTALL.md for more information"
        
        # Test configuration if requested
        if [ "$test_config" = true ]; then
            echo
            test_configuration
        fi
    else
        print_error "Setup failed - please check the error messages above"
        exit 1
    fi
}

# Run main function
main "$@"
